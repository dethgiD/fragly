import pandas as pd
import math
import numpy as np

# List of non-shootable weapons
NON_SHOOTABLE_PREFIXES = [
    'weapon_knife', 'weapon_knife', 'weapon_molotov', 'weapon_incgrenade', "weapon_molotov",
    'weapon_decoy', 'weapon_flashbang', 'weapon_hegrenade', 'weapon_smokegrenade'
]


def is_shootable(weapon_name):
    return not any(weapon_name.startswith(prefix) for prefix in NON_SHOOTABLE_PREFIXES)


def calculate_accuracy(username, player_hurt_df, weapon_fire_df):
    """Regular accuracy and headshot accuracy."""
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


def calculate_enemy_spotted_accuracy(username, player_hurt_df, weapon_fire_df, df, vc):
    print("---------------------------------------------------------------------")
    print(f'Calculating accuracy for {username}')
    shots_spotted = 0
    hits_spotted = 0
    # Get weapon_fire events for player
    shots = weapon_fire_df[
        (weapon_fire_df["user_name"] == username) &
        (weapon_fire_df["weapon"].apply(is_shootable))
        ]
    # Get all hits for player
    hits = player_hurt_df[(player_hurt_df["attacker_name"] == username) &
                          (player_hurt_df["hitgroup"] != "generic")]
    # Get all ticks when player fired a weapon
    ticks = shots["tick"].unique()
    # Loop through all ticks where player fired a weapon
    for tick in ticks:
        # Get player's team
        player_df = df[(df["name"] == username) & (df["tick"] == tick)].iloc[0]
        player_team = player_df["team_name"]
        # Get player's position on tick
        player_pos = (player_df["X"], player_df["Y"], player_df["Z"])
        # Filter for enemies
        enemies = df[(df["tick"] == tick) & (df["team_name"] != player_team)]
        # Get enemies usernames
        enemy_usernames = enemies["name"].unique()
        # Loop through enemy usernames
        for enemy_name in enemy_usernames:
            # Get enemy's df row on tick
            enemy = enemies[(enemies["name"] == enemy_name)].iloc[0]
            # Get enemy position
            enemy_pos = (enemy["X"], enemy["Y"], enemy["Z"])
            # Check visibility
            if vc.is_visible(player_pos, enemy_pos):
                # If player can see the enemy we add to shots when enemy spotted
                shots_spotted = shots_spotted + 1
                # We also check player hurt event for this tick if spotted
                hurt_enemy = player_hurt_df[(player_hurt_df["tick"] == tick)
                                            & (player_hurt_df["attacker_name"] == username)]
                if not hurt_enemy.empty:
                    hits_spotted = hits_spotted + 1

    # After counting all shots at an enemy spotted, divide by shots hit
    accuracy = hits_spotted / shots_spotted
    print(f'{username} accuracy enemy spotted: {accuracy}, '
          f'total hits at enemy spotted: {hits_spotted}, '
          f'total shots at enemy spotted: {shots_spotted}'
          )
    return accuracy



def calculate_avg_time_to_damage(username, player_hurt_df, df, vc, tickrate=64):
    """Avg time from spotting to hurting (go backwards live checking visibility)."""
    relevant_events = player_hurt_df[player_hurt_df["attacker_name"] == username]

    if relevant_events.empty:
        return None

    time_to_damage_list = []

    for _, hurt in relevant_events.iterrows():
        attacker_id = int(hurt["attacker_steamid"])
        victim_id = int(hurt["user_steamid"])
        hurt_tick = int(hurt["tick"])

        # Get attacker and victim movement data
        attacker_df = df[df["steamid"] == attacker_id]
        victim_df = df[df["steamid"] == victim_id]

        found_spot = False

        for t in range(hurt_tick, hurt_tick - 128, -1):
            attacker_pos = attacker_df[attacker_df["tick"] == t]
            victim_pos = victim_df[victim_df["tick"] == t]

            if attacker_pos.empty or victim_pos.empty:
                continue

            a_pos = (attacker_pos.iloc[0]["X"], attacker_pos.iloc[0]["Y"], attacker_pos.iloc[0]["Z"])
            v_pos = (victim_pos.iloc[0]["X"], victim_pos.iloc[0]["Y"], victim_pos.iloc[0]["Z"])

            if vc.is_visible(a_pos, v_pos):
                ticks_to_damage = hurt_tick - t
                time_to_damage_list.append(ticks_to_damage / tickrate)
                found_spot = True
                break  # Found spotting before hurting

    return sum(time_to_damage_list) / len(time_to_damage_list) if time_to_damage_list else None


def calculate_crosshair_placement(username, player_hurt_df, df, vc):
    """Avg crosshair adjustment from first seeing to hurting."""
    placements = []

    for _, hurt in player_hurt_df[player_hurt_df["attacker_name"] == username].iterrows():
        attacker_id = int(hurt["attacker_steamid"])
        victim_id = int(hurt["user_steamid"])
        hurt_tick = int(hurt["tick"])

        attacker_df = df[df["steamid"] == attacker_id]
        victim_df = df[df["steamid"] == victim_id]

        baseline_pitch = None
        baseline_yaw = None

        for t in range(hurt_tick, hurt_tick - 128, -1):
            attacker_pos = attacker_df[attacker_df["tick"] == t]
            victim_pos = victim_df[victim_df["tick"] == t]

            if attacker_pos.empty or victim_pos.empty:
                continue

            a_pos = (attacker_pos.iloc[0]["X"], attacker_pos.iloc[0]["Y"], attacker_pos.iloc[0]["Z"])
            v_pos = (victim_pos.iloc[0]["X"], victim_pos.iloc[0]["Y"], victim_pos.iloc[0]["Z"])

            if vc.is_visible(a_pos, v_pos):
                baseline_pitch = attacker_pos.iloc[0]["pitch"]
                baseline_yaw = attacker_pos.iloc[0]["yaw"]
                break

        if baseline_pitch is not None and baseline_yaw is not None:
            final_state = attacker_df[attacker_df["tick"] == hurt_tick]
            if not final_state.empty:
                final_pitch = final_state.iloc[0]["pitch"]
                final_yaw = final_state.iloc[0]["yaw"]

                delta_pitch = final_pitch - baseline_pitch
                delta_yaw = final_yaw - baseline_yaw
                placement = math.sqrt(delta_pitch ** 2 + delta_yaw ** 2)
                placements.append(placement)

    return sum(placements) / len(placements) if placements else None


def calculate_counter_strafing_accuracy(username, weapon_fire_df, df, vc):
    """Counter-strafing shots only when enemy visible."""
    rifles = ["weapon_ak47", "weapon_m4a1", "weapon_m4a1_silencer", "weapon_galilar",
              "weapon_famas", "weapon_sg556", "weapon_aug"]

    attacker_shots = weapon_fire_df[
        (weapon_fire_df["user_name"] == username) &
        (weapon_fire_df["weapon"].isin(rifles))
        ]

    if attacker_shots.empty:
        return None

    good_shots = 0
    total_shots = 0

    for _, shot in attacker_shots.iterrows():
        tick = int(shot["tick"])
        shooter_id = int(shot["user_steamid"])
        shooter_pos = (shot["user_X"], shot["user_Y"], shot["user_Z"])

        enemies = df[(df["tick"] == tick) & (df["steamid"] != shooter_id)]

        visible_enemy = False
        for _, enemy in enemies.iterrows():
            enemy_pos = (enemy["X"], enemy["Y"], enemy["Z"])
            if vc.is_visible(shooter_pos, enemy_pos):
                visible_enemy = True
                break

        if not visible_enemy:
            continue

        state = df[(df["tick"] == tick) & (df["steamid"] == shooter_id)]
        if state.empty:
            continue

        velocity = state.iloc[0]["velocity"]
        max_speed = state.iloc[0]["max_speed"]
        in_crouch = state.iloc[0]["in_crouch"]

        if in_crouch:
            continue  # Ignore crouch shots

        total_shots += 1

        if velocity <= 0.34 * max_speed:
            good_shots += 1

    return good_shots / total_shots if total_shots > 0 else None


def analyze_all_players(player_hurt_df, weapon_fire_df, df, vc):
    """Main function with live visibility checking."""
    usernames = weapon_fire_df["user_name"].unique()
    all_data = []

    for username in usernames:
        accuracy, headshot_accuracy = calculate_accuracy(username, player_hurt_df, weapon_fire_df)
        accuracy_enemy_spotted = calculate_enemy_spotted_accuracy(username, player_hurt_df, weapon_fire_df, df, vc)
        # avg_ttd = calculate_avg_time_to_damage(username, player_hurt_df, df, vc)
        # crosshair_placement = calculate_crosshair_placement(username, player_hurt_df, df, vc)
        # counter_strafing = calculate_counter_strafing_accuracy(username, weapon_fire_df, df, vc)

        all_data.append({
            "username": username,
            "accuracy": f"{accuracy:.2f}",
            "accuracy_spotted": f"{accuracy_enemy_spotted:.2f}",
            # "hs_accuracy": f"{headshot_accuracy:.2f}",
            # "time_to_damage": f"{avg_ttd:.3f}" if avg_ttd is not None else "N/A",
            # "crosshair_placement": f"{crosshair_placement:.2f}" if crosshair_placement is not None else "N/A",
            # "counter_strafing": f"{counter_strafing:.2f}" if counter_strafing is not None else "N/A",
        })

    return pd.DataFrame(all_data)
