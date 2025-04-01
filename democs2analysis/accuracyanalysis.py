from demoparser2 import DemoParser
import pandas as pd
import math
import numpy as np


def load_demo_data(demo_path):
    # Load demo
    parser = DemoParser(demo_path)

    # Parse necessary data
    player_hurt_df = parser.parse_event("player_hurt", player=["X", "Y"], other=["pitch", "yaw"])
    weapon_fire_df = parser.parse_event("weapon_fire", player=["X", "Y"], other=["pitch", "yaw"])
    df = parser.parse_ticks(["pitch", "yaw", "spotted", "X", "Y", "Z"])
    return player_hurt_df, weapon_fire_df, df


# List of non-shootable weapons
NON_SHOOTABLE_PREFIXES = [
    'weapon_knife', 'weapon_molotov', 'weapon_incgrenade',
    'weapon_decoy', 'weapon_flashbang', 'weapon_hegrenade', 'weapon_smokegrenade'
]


def is_shootable(weapon_name):
    """Check if a weapon is a firearm and can be counted in shot accuracy."""
    return not any(weapon_name.startswith(prefix) for prefix in NON_SHOOTABLE_PREFIXES)


def calculate_accuracy(username, player_hurt_df, weapon_fire_df):
    """Calculate accuracy and headshot accuracy for a given player."""
    shots_hit = len(player_hurt_df[(player_hurt_df["attacker_name"] == username) &
                                   (player_hurt_df["hitgroup"] != "generic")])

    shots_hit_head = len(player_hurt_df[(player_hurt_df["attacker_name"] == username) &
                                        (player_hurt_df["hitgroup"] == "head")])

    shootable_weapon_fire_df = weapon_fire_df[
        (weapon_fire_df["user_name"] == username) &
        (weapon_fire_df["weapon"].apply(is_shootable))
    ]

    shots_fired = len(shootable_weapon_fire_df)

    accuracy = (shots_hit / shots_fired) * 100 if shots_fired > 0 else 0
    headshot_accuracy = (shots_hit_head / shots_hit) * 100 if shots_hit > 0 else 0

    return accuracy, headshot_accuracy


def calculate_avg_time_to_damage(attacker_name, player_hurt_df, df, tickrate=64):
    """Calculate the average time from spotting an enemy to dealing damage."""

    # Pre-filter only events where the attacker is the specified player
    relevant_events = player_hurt_df[player_hurt_df["attacker_name"] == attacker_name]

    if relevant_events.empty:
        return None

    # Extract all victim names and damage ticks in one go
    damage_data = relevant_events[["user_name", "tick"]].values

    # Create a lookup dictionary for all spotted changes
    # First, prepare a DataFrame with name, tick, spotted and the previous spotted value
    search_window = 96  # 1.5 seconds at 64 tickrate

    # Get unique victims from the damage data
    unique_victims = set(victim for victim, _ in damage_data)

    # Pre-filter df to only include relevant victims
    victim_df = df[df["name"].isin(unique_victims)][["name", "tick", "spotted"]]

    # Create a column indicating when spotted changes from False to True
    victim_df = victim_df.sort_values(["name", "tick"])

    # Fix for the FutureWarning - use an explicit boolean type for fillna
    prev_spotted = victim_df.groupby("name")["spotted"].shift(1)
    victim_df["prev_spotted"] = prev_spotted.fillna(False).astype(bool)

    spotted_changes = victim_df[(victim_df["spotted"] == True) & (victim_df["prev_spotted"] == False)]

    # Create a dictionary for fast lookup: {victim_name: [tick1, tick2, ...]}
    spotted_dict = {}
    for name, group in spotted_changes.groupby("name"):
        spotted_dict[name] = sorted(group["tick"].tolist())

    time_to_damage_list = []

    # Process each damage event
    for victim, damage_tick in damage_data:
        if victim not in spotted_dict:
            continue

        search_start_tick = max(0, damage_tick - search_window)

        # Binary search to find the closest spotted tick before damage
        spotted_ticks = spotted_dict[victim]

        # Find the right spotted tick using binary search
        left, right = 0, len(spotted_ticks) - 1
        closest_spotted_tick = None

        while left <= right:
            mid = (left + right) // 2
            if spotted_ticks[mid] <= damage_tick and spotted_ticks[mid] >= search_start_tick:
                closest_spotted_tick = spotted_ticks[mid]
                # Look for even closer tick
                left = mid + 1
            elif spotted_ticks[mid] > damage_tick:
                right = mid - 1
            else:
                left = mid + 1

        # Linear search as a fallback (only within the search window)
        if closest_spotted_tick is None:
            for tick in reversed(spotted_ticks):
                if tick <= damage_tick and tick >= search_start_tick:
                    closest_spotted_tick = tick
                    break

        if closest_spotted_tick is not None:
            time_to_damage_ticks = damage_tick - closest_spotted_tick
            time_to_damage_seconds = time_to_damage_ticks / tickrate
            time_to_damage_list.append(time_to_damage_seconds)

    return sum(time_to_damage_list) / len(time_to_damage_list) if time_to_damage_list else None


def calculate_accuracy_by_window(attacker_name, player_hurt_df, weapon_fire_df):
    """
    Calculate an approximate "engagement accuracy" for a given attacker by looking at
    the number of bullets fired within a specified window (default 64 ticks, ~1 second)
    before a hit event occurs.

    The assumption is that if you hit an enemy, the shots fired in the previous window
    were aimed at that enemy. Note that this is a workaround:
      - It will count as "engaged" even if you were shooting through walls.
      - If windows overlap, some shots might be counted multiple times.
    """
    total_shots = 0
    total_hits = 0
    window_ticks = 64

    # Filter hit events for the attacker (and optionally exclude "generic" hits)
    attacker_hits = player_hurt_df[(player_hurt_df["attacker_name"] == attacker_name) &
                                   (player_hurt_df["hitgroup"] != "generic")]

    # Iterate over each hit event
    for _, hit_event in attacker_hits.iterrows():
        damage_tick = hit_event["tick"]

        # Define the engagement window before the hit event
        start_tick = max(0, damage_tick - window_ticks)

        # Count shots fired by the attacker in that window
        window_shots = weapon_fire_df[
            (weapon_fire_df["user_name"] == attacker_name) &
            (weapon_fire_df["tick"].between(start_tick, damage_tick))
            ]
        shot_count = len(window_shots)

        # If no shots were fired in that window, skip this hit event.
        if shot_count == 0:
            continue

        # Add to our counters:
        # We consider each hit event as a single "successful" shot,
        # and the total attempts are the number of shots in that engagement window.
        total_shots += shot_count
        total_hits += 1

    # Calculate accuracy as a percentage.
    accuracy = (total_hits / total_shots) * 100 if total_shots > 0 else 0
    return accuracy


def calculate_crosshair_placement(attacker_name, player_hurt_df, df):
    """
    Calculate an approximate crosshair placement adjustment for a given attacker.

    For each hit event (excluding generic hits), this function:
      - Uses a window of `window_ticks` (default ~20 ticks) before the damage tick.
      - Computes the cumulative angular adjustment (the sum of angular differences between consecutive ticks).

    A lower cumulative adjustment suggests that the player's crosshair was already well placed.
    """
    placements = []
    window_ticks = 20

    # Filter hit events for the attacker (and exclude generic hits)
    attacker_hits = player_hurt_df[
        (player_hurt_df["attacker_name"] == attacker_name) &
        (player_hurt_df["hitgroup"] != "generic")
        ]

    for _, hit_event in attacker_hits.iterrows():
        damage_tick = hit_event["tick"]
        start_tick = max(0, damage_tick - window_ticks)

        # Get tick data (pitch and yaw) for the attacker in the specified window.
        # We assume df contains columns: 'tick', 'pitch', 'yaw', and 'name'
        window_data = df[
            (df["tick"].between(start_tick, damage_tick)) &
            (df["name"] == attacker_name)
            ][["tick", "pitch", "yaw"]].sort_values(by="tick")

        # Ensure we have enough data points
        if window_data.empty or len(window_data) < 2:
            continue

        cumulative_adjustment = 0.0
        previous_row = window_data.iloc[0]
        for idx in range(1, len(window_data)):
            current_row = window_data.iloc[idx]
            # Calculate angular change between consecutive ticks.
            delta_pitch = current_row["pitch"] - previous_row["pitch"]
            delta_yaw = current_row["yaw"] - previous_row["yaw"]

            # If desired, you can handle angle wrap-around here.
            angular_change = math.sqrt(delta_pitch ** 2 + delta_yaw ** 2)
            cumulative_adjustment += angular_change
            previous_row = current_row

        placements.append(cumulative_adjustment)

    if placements:
        # Return the average adjustment over all hit events.
        return sum(placements) / len(placements)
    else:
        return None


def calculate_crosshair_placement_consecutive(attacker_name, player_hurt_df, df):
    """
    Calculate average crosshair placement adjustment for a given attacker by grouping consecutive hit events.

    For each hit event (excluding generic hits) from the attacker:
      - If the hit is the first in an engagement (or a new target) or occurs after a gap of 'engagement_gap' ticks
        from the previous hit on the same target, process it.
      - For that hit, look at a window of 'window_ticks' before the damage tick.
      - Compute the average pitch and yaw for the first quarter of that window (baseline) and for the last quarter (final state).
      - Compute the Euclidean angular difference between these averages.

    Returns the average crosshair placement (in degrees) over all such engagements.
    """
    placements = []
    window_ticks = 20
    engagement_gap = 64

    # Pre-filter all necessary data
    # 1. Filter hit events for the attacker, excluding generic hits
    attacker_hits = player_hurt_df[
        (player_hurt_df["attacker_name"] == attacker_name) &
        (player_hurt_df["hitgroup"] != "generic")
        ].sort_values(by="tick")

    if attacker_hits.empty:
        return None

    # 2. Pre-filter df to only contain rows for this attacker
    attacker_df = df[df["name"] == attacker_name][["tick", "pitch", "yaw"]]

    # Vectorized operation to avoid slow iterrows()
    hit_data = attacker_hits[["tick", "user_name"]].to_numpy()

    last_hit_tick = None
    last_target = None

    for i in range(len(hit_data)):
        damage_tick, target = hit_data[i]

        # Check if this hit is part of a consecutive series on the same target
        if last_hit_tick is not None and target == last_target and (damage_tick - last_hit_tick) < engagement_gap:
            # Skip subsequent hits in a rapid series on the same target
            continue

        # Update tracking variables: treat this hit as a new engagement
        last_hit_tick = damage_tick
        last_target = target

        # Define the analysis window (e.g., 20 ticks before the damage tick)
        start_tick = max(0, damage_tick - window_ticks)

        # Use boolean indexing for faster filtering
        window_mask = (attacker_df["tick"] >= start_tick) & (attacker_df["tick"] <= damage_tick)
        window_data = attacker_df[window_mask].sort_values(by="tick")

        # We need enough data points to compute averages
        if len(window_data) < 4:
            continue

        # Divide the window into quarters - use numpy for faster operations
        quarter = max(1, len(window_data) // 4)

        # Extract arrays directly for faster calculations
        pitches = window_data["pitch"].to_numpy()
        yaws = window_data["yaw"].to_numpy()

        # Calculate averages using numpy - much faster than DataFrame operations
        baseline_pitch = np.mean(pitches[:quarter])
        baseline_yaw = np.mean(yaws[:quarter])
        final_pitch = np.mean(pitches[-quarter:])
        final_yaw = np.mean(yaws[-quarter:])

        delta_pitch = final_pitch - baseline_pitch
        delta_yaw = final_yaw - baseline_yaw

        # Calculate the Euclidean angular difference
        placement = math.sqrt(delta_pitch ** 2 + delta_yaw ** 2)
        placements.append(placement)

    if placements:
        return sum(placements) / len(placements)
    else:
        return None


def calculate_victim_crosshair_placement(victim_name, player_hurt_df, df):
    """
    Calculates the crosshair placement error for a victim by comparing their
    actual pitch/yaw to the expected pitch/yaw (based on attacker's position).

    Returns the average placement error over all engagements.
    """
    errors = []

    # Get all events where this player was the victim
    victim_hits = player_hurt_df[player_hurt_df["user_name"] == victim_name].sort_values(by="tick")

    for _, hit_event in victim_hits.iterrows():
        tick = hit_event["tick"]
        attacker_name = hit_event["attacker_name"]

        # Get victim and attacker positions at the moment of impact
        victim_data = df[(df["tick"] == tick) & (df["name"] == victim_name)]
        attacker_data = df[(df["tick"] == tick) & (df["name"] == attacker_name)]

        if victim_data.empty or attacker_data.empty:
            continue  # Skip if data is missing

        # Extract positions and angles
        victim_x, victim_y, victim_z = victim_data.iloc[0][["X", "Y", "Z"]]
        attacker_x, attacker_y, attacker_z = attacker_data.iloc[0][["X", "Y", "Z"]]
        actual_pitch, actual_yaw = victim_data.iloc[0][["pitch", "yaw"]]

        # Calculate expected yaw
        expected_yaw = math.degrees(math.atan2(attacker_y - victim_y, attacker_x - victim_x))

        # Calculate expected pitch
        d_xy = math.sqrt((attacker_x - victim_x) ** 2 + (attacker_y - victim_y) ** 2)
        expected_pitch = -math.degrees(math.atan2(attacker_z - victim_z, d_xy))

        # Compute error in pitch and yaw
        delta_pitch = abs(actual_pitch - expected_pitch)
        delta_yaw = abs(actual_yaw - expected_yaw)

        # Ensure yaw error is within 180 degrees (to handle wraparound cases)
        delta_yaw = min(delta_yaw, 360 - delta_yaw)

        # Calculate total crosshair placement error
        error = math.sqrt(delta_pitch ** 2 + delta_yaw ** 2)
        errors.append(error)

    if errors:
        return sum(errors) / len(errors)  # Return average error
    else:
        return None



# def analyze_player(username):
#     """Calculate and print accuracy, headshot accuracy, and time to damage for a player."""
#     accuracy, headshot_accuracy = calculate_accuracy(username)
#     avg_ttd = calculate_avg_time_to_damage(username)
#     accuracy_enemy_spotted = calculate_accuracy_by_window(username)
#
#     print(f"{username}'s Performance:")
#     print(f" - Accuracy: {accuracy:.2f}%")
#     print(f" - Accuracy (Enemy Spotted): {accuracy_enemy_spotted:.2f}%")
#     print(f" - Headshot Accuracy: {headshot_accuracy:.2f}%")
#     print(f" - Average Time to Damage: {avg_ttd:.3f} seconds" if avg_ttd is not None else " - No valid time to damage data.")
#     print("-" * 40)  # Separator for better readability


def analyze_all_players(demo_path):
    """
    Calculate various performance metrics for multiple players and return a dataframe.
    The metrics include:
      - Overall accuracy (calculate_accuracy)
      - Accuracy when enemy is (assumed) engaged (calculate_accuracy_by_window)
      - Headshot accuracy (calculate_accuracy)
      - Average time to damage (calculate_avg_time_to_damage)
      - Average crosshair placement adjustment (calculate_crosshair_placement)
      - Average crosshair placement error (calculate_victim_crosshair_placement)
    """
    player_hurt_df, weapon_fire_df, df = load_demo_data(demo_path)

    usernames = weapon_fire_df["user_name"].unique()

    all_data = []  # List to store player results

    for username in usernames:
        # Calculate metrics using existing functions
        accuracy, headshot_accuracy = calculate_accuracy(username, player_hurt_df, weapon_fire_df)
        avg_ttd = calculate_avg_time_to_damage(username, player_hurt_df, df)
        accuracy_enemy_spotted = calculate_accuracy_by_window(username, player_hurt_df, weapon_fire_df)
        crosshair_placement = calculate_crosshair_placement_consecutive(username, player_hurt_df, df)
        # victim_crosshair_error = calculate_victim_crosshair_placement(username, player_hurt_df, df)

        all_data.append({
            "username": username,
            "accuracy": f"{accuracy:.2f}",
            "accuracy_spotted": f"{accuracy_enemy_spotted:.2f}",
            "hs_accuracy": f"{headshot_accuracy:.2f}",
            "time_to_damage": f"{avg_ttd:.3f}" if avg_ttd is not None else "N/A",
            "crosshair_placement": f"{crosshair_placement:.2f}" if crosshair_placement is not None else "N/A",
            # "crosshair_error": f"{victim_crosshair_error:.2f}" if victim_crosshair_error is not None else "N/A"
        })

    # Convert the collected data into a DataFrame
    result_df = pd.DataFrame(all_data)
    return result_df
