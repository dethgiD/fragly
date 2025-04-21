import sys
import accuracyanalysis
import positioninganalysis
from demoparser2 import DemoParser
import pandas as pd

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
    analysis_results = accuracy_df.merge(positioning_df, on="username").to_json()
    
    return analysis_results

if __name__ == "__main__":
    # Get the demo path from command line arguments
    demo_path = sys.argv[1]
    results = analyze_demo(demo_path)

    # Output the result as JSON
    print(results)  # This is what your NestJS backend will read
