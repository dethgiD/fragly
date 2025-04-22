from demoparser2 import DemoParser
import pandas as pd
import math
import numpy as np

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
    search_window = 128

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


def detect_engagements(attacker_name, weapon_fire_df, player_death_df, df, max_gap_ticks=32):
    """
    Detects engagements for a given attacker.

    Engagement starts when the attacker fires a shot AND has spotted an enemy.
    Engagement ends when:
      1. The attacker kills a player.
      2. The attacker dies.
      3. The attacker has no spotted enemies for too long (max_gap_ticks).

    Args:
        attacker_name (str): The attacker's name.
        weapon_fire_df (pd.DataFrame): DataFrame of weapon fire events.
        player_death_df (pd.DataFrame): DataFrame of death events.
        df (pd.DataFrame): Main tick data with "spotted" values.
        max_gap_ticks (int): Max ticks without a spotted enemy before ending an engagement.

    Returns:
        list of tuples: A list of (start_tick, end_tick) pairs representing engagements.
    """
    engagements = []

    # Filter relevant data once (using .values for faster access)
    attacker_shots = weapon_fire_df.loc[weapon_fire_df["user_name"] == attacker_name, "tick"].sort_values().values
    attacker_kills = player_death_df.loc[player_death_df["attacker_name"] == attacker_name, "tick"].sort_values().values
    attacker_deaths = player_death_df[
        (player_death_df["user_name"] == attacker_name) &
        (player_death_df["weapon"] != "world")
        ]["tick"].sort_values().values

    if len(attacker_shots) == 0:
        return engagements  # No engagements if no shots were fired

    # Pre-compute spotted enemies data
    attacker_data = df[df["name"] == attacker_name][["tick", "spotted"]]
    spotted_ticks = set(attacker_data[attacker_data["spotted"] == True]["tick"].values)

    # Find the first shot where enemy was spotted
    current_engagement = None
    last_shot_tick = None

    kill_index = 0
    num_kills = len(attacker_kills)

    death_index = 0
    num_deaths = len(attacker_deaths)

    # Process all shots
    for shot_tick in attacker_shots:
        # Check for nearby spotted ticks (to handle small timing differences)
        nearby_range = range(max(0, shot_tick - 1), shot_tick + 1)  # Check 10 ticks before and after
        has_spotted_nearby = bool(set(nearby_range).intersection(spotted_ticks))

        # Check if attacker died before this shot
        while death_index < num_deaths and attacker_deaths[death_index] < shot_tick:
            death_tick = attacker_deaths[death_index]
            if current_engagement is not None and death_tick >= current_engagement:
                engagements.append((current_engagement, death_tick))
                current_engagement = None  # Reset engagement since attacker died
            death_index += 1

        # If no active engagement and enemy spotted, start a new one
        if current_engagement is None and has_spotted_nearby:
            current_engagement = shot_tick
            last_shot_tick = shot_tick
            continue

        # If we have an active engagement
        if current_engagement is not None:
            # Check for a long gap with no enemies spotted
            if last_shot_tick is not None and (shot_tick - last_shot_tick) > max_gap_ticks:
                # Check if there were spotted enemies in the gap
                tick_range = set(range(last_shot_tick + 1, shot_tick))
                spotted_in_gap = bool(tick_range.intersection(spotted_ticks))

                if not spotted_in_gap:
                    engagements.append((current_engagement, last_shot_tick))  # End engagement
                    # Only start a new engagement if enemy is spotted
                    if has_spotted_nearby:
                        current_engagement = shot_tick
                    else:
                        current_engagement = None
                        continue

            # Check if the attacker got a kill
            while kill_index < num_kills and attacker_kills[kill_index] <= shot_tick:
                kill_tick = attacker_kills[kill_index]

                if kill_tick >= current_engagement:  # Only count kills after engagement started
                    engagements.append((current_engagement, kill_tick))
                    # Only start a new engagement if enemy is spotted
                    if has_spotted_nearby:
                        current_engagement = shot_tick
                    else:
                        current_engagement = None
                kill_index += 1

            last_shot_tick = shot_tick

    # Handle any remaining kills or deaths after the last shot
    if current_engagement is not None:
        # Check if attacker died after last shot
        while death_index < num_deaths:
            death_tick = attacker_deaths[death_index]
            if death_tick >= current_engagement:
                engagements.append((current_engagement, death_tick))
                current_engagement = None
                break
            death_index += 1

        # Handle any remaining kills if attacker didn't die
        if current_engagement is not None:
            while kill_index < num_kills and attacker_kills[kill_index] >= current_engagement:
                kill_tick = attacker_kills[kill_index]
                engagements.append((current_engagement, kill_tick))
                current_engagement = None
                break

        # Close the last engagement if it's still open
        if current_engagement is not None and last_shot_tick is not None:
            engagements.append((current_engagement, last_shot_tick))

    # Filter out engagements that start and end on the same tick
    valid_engagements = [(start, end) for start, end in engagements if start < end]
    return valid_engagements


def calculate_spotted_accuracy(attacker_name, player_hurt_df, weapon_fire_df, engagements):
    """
    Calculate spotted accuracy

    Args:
        attacker_name (str): The attacker's name.
        player_hurt_df (pd.DataFrame): DataFrame of hit events.
        weapon_fire_df (pd.DataFrame): DataFrame of weapon fire events.
        engagements (list): List of tuples (start_tick, end_tick) representing engagement windows.

    Returns:
        float: Accuracy percentage (hits / shots fired * 100)
    """
    total_shots = 0
    total_hits = 0

    # Early return if no engagements
    if not engagements:
        return 0.0

    # Filter relevant data once for efficiency
    attacker_shots = weapon_fire_df[weapon_fire_df["user_name"] == attacker_name]
    attacker_hits = player_hurt_df[(player_hurt_df["attacker_name"] == attacker_name) &
                                   (player_hurt_df["hitgroup"] != "generic")]

    # Process each engagement
    for start_tick, end_tick in engagements:
        # Count shots fired during this engagement
        engagement_shots = attacker_shots[attacker_shots["tick"].between(start_tick, end_tick)]
        shots_count = len(engagement_shots)

        # Count hits landed during this engagement
        engagement_hits = attacker_hits[attacker_hits["tick"].between(start_tick, end_tick)]
        hits_count = len(engagement_hits)

        # Add to totals
        total_shots += shots_count
        total_hits += hits_count

    # Calculate accuracy as a percentage
    accuracy = (total_hits / total_shots) * 100 if total_shots > 0 else 0.0

    return accuracy


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
    window_ticks = 16
    engagement_gap = 32

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

        # Divide the window into quarters
        quarter = max(1, len(window_data) // 4)

        # Extract arrays directly for faster calculations
        pitches = window_data["pitch"].to_numpy()
        yaws = window_data["yaw"].to_numpy()

        # Calculate averages
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


def calculate_counter_strafing_accuracy(attacker_name, weapon_fire_df, df):
    """Calculate counter-strafing accuracy for a given player."""

    rifles = ["weapon_ak47", "weapon_m4a1", "weapon_m4a1_silencer", "weapon_galilar",
              "weapon_famas", "weapon_sg556", "weapon_aug"]

    # Get shots fired by the attacker, filtered for rifles only
    attacker_shots = weapon_fire_df[
        (weapon_fire_df["user_name"] == attacker_name) &
        (weapon_fire_df["weapon"].isin(rifles))
        ].sort_values(by="tick")

    # No shots fired, return None
    if attacker_shots.empty:
        return None

    # Extract shot ticks for filtering
    shot_ticks = set(attacker_shots["tick"])

    # Filter main df to get only rows with matching ticks
    attacker_df = df[(df["name"] == attacker_name) & (df["tick"].isin(shot_ticks))][
        ["tick", "velocity", "max_speed", "in_crouch"]]

    # Create a dictionary for fast player state lookup by tick
    player_state_dict = {}
    for _, row in attacker_df.iterrows():
        player_state_dict[row["tick"]] = (row["velocity"], row["max_speed"], row["in_crouch"])

    # Initialize counters
    good_shots = 0
    total_strafe_shots = 0

    # Process each shot
    for _, shot in attacker_shots.iterrows():
        shot_tick = shot["tick"]

        # Skip if we don't have player state for this tick
        if shot_tick not in player_state_dict:
            continue

        # Get player state at the time of shot
        velocity, max_speed, in_crouch = player_state_dict[shot_tick]

        # Check if this is a strafing shot (moving and not crouching)
        if not in_crouch:
            total_strafe_shots += 1

            # Check if it's a good counter-strafing shot (velocity <= 34% of max speed)
            if velocity <= 0.34 * max_speed:
                good_shots += 1

    # Calculate accuracy, or return None if no strafing shots
    return good_shots / total_strafe_shots if total_strafe_shots > 0 else None


def analyze_all_players(player_hurt_df, weapon_fire_df, player_death_df, df):
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

    players = weapon_fire_df[["user_steamid", "user_name"]].drop_duplicates()
    all_data = []  # List to store player results

    for _, row in players.iterrows():
        steam_id = row["user_steamid"]
        username = row["user_name"]
        # Calculate metrics using existing functions
        engagements = detect_engagements(username, weapon_fire_df, player_death_df, df)
        accuracy, headshot_accuracy = calculate_accuracy(username, player_hurt_df, weapon_fire_df)
        avg_ttd = calculate_avg_time_to_damage(username, player_hurt_df, df)
        accuracy_enemy_spotted = calculate_spotted_accuracy(username, player_hurt_df, weapon_fire_df, engagements)
        crosshair_placement = calculate_crosshair_placement_consecutive(username, player_hurt_df, df)
        counter_strafing = calculate_counter_strafing_accuracy(username, weapon_fire_df, df)
        # victim_crosshair_error = calculate_victim_crosshair_placement(username, player_hurt_df, df)

        all_data.append({
            "steam_id": steam_id,
            "username": username,
            "accuracy": f"{accuracy:.2f}",
            "accuracy_spotted": f"{accuracy_enemy_spotted:.2f}",
            "hs_accuracy": f"{headshot_accuracy:.2f}",
            "time_to_damage": f"{avg_ttd:.3f}" if avg_ttd is not None else "N/A",
            "crosshair_placement": f"{crosshair_placement:.2f}" if crosshair_placement is not None else "N/A",
            "counter_strafing": f"{counter_strafing:.2f}" if counter_strafing is not None else "N/A",
        })

    # Convert the collected data into a DataFrame
    result_df = pd.DataFrame(all_data)
    return result_df
