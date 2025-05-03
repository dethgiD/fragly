import accuracyanalysis
import positioninganalysis
import time
from awpy.visibility import VisibilityChecker
from awpy.data import TRIS_DIR
from demoparser2 import DemoParser

demo_path = "D:/Demos/DightedAnubisTest.dem"

# Load demo
print("Loading demo...")
parser = DemoParser(demo_path)
print("Demo loaded.")
# Visibility checker
header = parser.parse_header()
map_tri = TRIS_DIR / (header["map_name"] + ".tri")
tris = VisibilityChecker.read_tri_file(map_tri)
print("Constructing visibility checker...")
vc = VisibilityChecker(triangles=tris)
print("Visibility checker constructed.")
# Parse necessary data
print("Parsing data from demo...")
player_hurt_df = parser.parse_event("player_hurt", player=["X", "Y", "Z"])
weapon_fire_df = parser.parse_event("weapon_fire", player=["X", "Y", "Z"])
player_death_df = parser.parse_event("player_death", player=["X", "Y", "Z"],
                                     other=["total_rounds_played", "game_phase"])
df = parser.parse_ticks(["pitch", "yaw", "spotted", "X", "Y", "Z", "velocity", "max_speed",
                         "in_crouch", "team_name"])

print(df["steamid"].head(10))
print("Data parsed.")

start_time = time.time()
print("Calculating accuracy metrics...")
accuracy_df = accuracyanalysis.analyze_all_players(player_hurt_df, weapon_fire_df, df, vc)
print("Calculating positioning metrics...")
positioning_df = positioninganalysis.analyze_all_players(player_death_df)
accuracy_df.to_excel("accuracytest.xlsx")
positioning_df.to_excel("positioningtest.xlsx")
end_time = time.time()
print(f'Elapsed time (calculating metrics): {end_time - start_time}')
