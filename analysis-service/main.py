import accuracyanalysis
import positioninganalysis
import time
from demoparser2 import DemoParser
from line_profiler import LineProfiler

start_time = time.time()

demo_path = "D:/Demos/DightedInfernoTest.dem"

# Load demo
parser = DemoParser(demo_path)

# Parse necessary data
player_hurt_df = parser.parse_event("player_hurt", player=["X", "Y"])
weapon_fire_df = parser.parse_event("weapon_fire", player=["X", "Y"])
player_death_df = parser.parse_event("player_death", player=["X", "Y"],
                                     other=["total_rounds_played", "game_phase"])
df = parser.parse_ticks(["pitch", "yaw", "spotted", "X", "Y", "Z", "velocity", "max_speed",
                         "in_crouch"])

profiler = LineProfiler()
profiler.add_function(accuracyanalysis.analyze_all_players)
profiler.add_function(positioninganalysis.analyze_all_players)
profiler.enable()

accuracy_df = accuracyanalysis.analyze_all_players(player_hurt_df, weapon_fire_df, df)
positioning_df = positioninganalysis.analyze_all_players(player_death_df)
profiler.disable()
profiler.print_stats()
end_time = time.time()

accuracy_df.to_excel("accuracytest.xlsx")
positioning_df.to_excel("positioningtest.xlsx")

print(f"Execution time: {end_time - start_time:.6f} seconds")
