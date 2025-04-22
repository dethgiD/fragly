import sys
import accuracyanalysis
import positioninganalysis
from demoparser2 import DemoParser
import json
import hashlib

def compute_demo_hash(demo_path):
    sha256 = hashlib.sha256()
    with open(demo_path, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b""):
            sha256.update(chunk)
    return sha256.hexdigest()

def extract_team_info(parser):
    # Get the tick of the last round
    max_tick = parser.parse_event("round_end")["tick"].max()

    # Get end-of-game scores (one row per player)
    match_end_info = parser.parse_ticks(["team_rounds_total"], ticks=[max_tick])
    player_info = parser.parse_player_info()

    # Ensure steamid is string type for consistent merging
    match_end_info["steamid"] = match_end_info["steamid"].astype(str)
    player_info["steamid"] = player_info["steamid"].astype(str)

    # Map steamid to team number
    steamid_to_team = player_info.set_index("steamid")["team_number"].to_dict()
    match_end_info["team_number"] = match_end_info["steamid"].map(steamid_to_team)

    # Compute max score for each team
    team_scores = match_end_info.groupby("team_number")["team_rounds_total"].max().to_dict()

    return steamid_to_team, team_scores

def analyze_demo(demo_path):
    # Load demo
    parser = DemoParser(demo_path)

    # Parse necessary data
    player_hurt_df = parser.parse_event("player_hurt", player=["X", "Y"])
    weapon_fire_df = parser.parse_event("weapon_fire", player=["X", "Y"])
    player_death_df = parser.parse_event("player_death", player=["X", "Y"],
                                         other=["total_rounds_played", "game_phase"])
    df = parser.parse_ticks(["pitch", "yaw", "spotted", "X", "Y", "Z", "velocity", "max_speed",
                             "in_crouch"])

    # Perform analysis
    accuracy_df = accuracyanalysis.analyze_all_players(player_hurt_df, weapon_fire_df, player_death_df, df)
    positioning_df = positioninganalysis.analyze_all_players(player_death_df)

    # Reset index and merge
    accuracy_df = accuracy_df.reset_index()
    positioning_df = positioning_df.reset_index()
    players_df = accuracy_df.merge(positioning_df, on="username")

    # Add team_number to each player
    steamid_to_team, team_scores = extract_team_info(parser)
    players_df["steam_id"] = players_df["steam_id"].astype(str)
    players_df["team_number"] = players_df["steam_id"].map(steamid_to_team)

    # Final output structure
    result = {
        "match_id": compute_demo_hash(demo_path),
        "team1_score": team_scores.get(2),
        "team2_score": team_scores.get(3),
        "players": players_df.to_dict(orient="records")
    }

    return json.dumps(result, indent=2)

if __name__ == "__main__":
    demo_path = sys.argv[1]
    results = analyze_demo(demo_path)
    print(results)
