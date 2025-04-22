from demoparser2 import DemoParser
import numpy as np
from awpy.visibility import VisibilityChecker
from awpy.data import TRIS_DIR
import time
import concurrent.futures

parser = DemoParser("D:/Demos/DightedLeetifyTest.dem")

weapon_fire_df = parser.parse_event("weapon_fire", player=["X", "Y", "Z"])
player_death_df = parser.parse_event("player_death", player=["X", "Y", "Z"])
player_hurt_df = parser.parse_event("player_hurt", player=["X", "Y", "Z"])
bomb_planted_df = parser.parse_event("bomb_planted", player=["X", "Y", "Z"], other=["team_rounds_total"])
df = parser.parse_ticks(["pitch", "yaw",  "X", "Y", "Z", "team_name, team_rounds_total"])

parser.parse_player_info().to_excel("player_info.xlsx")
bomb_planted_df.to_excel("bomb_planted.xlsx")
print(parser.parse_header())

max_tick = parser.parse_event("round_end")["tick"].max()
df = parser.parse_ticks(["team_rounds_total"], ticks=[max_tick]).to_excel("round_end_info.xlsx")

# header = parser.parse_header()
# print(header["map_name"] + ".tri")
# map_tri = TRIS_DIR / (header["map_name"] + ".tri")
# tris = VisibilityChecker.read_tri_file(map_tri)
# vc = VisibilityChecker(triangles=tris)
# print(vc)


# def degrees_to_vector(pitch, yaw):
#     pitch_rad = np.radians(pitch)
#     yaw_rad = np.radians(yaw)

#     x = np.cos(pitch_rad) * np.cos(yaw_rad)
#     y = np.cos(pitch_rad) * np.sin(yaw_rad)
#     z = -np.sin(pitch_rad)
#     return np.array([x, y, z])


# def is_within_fov(origin, target, pitch, yaw, fov_deg):
#     direction = degrees_to_vector(pitch, yaw)
#     to_target = np.array(target) - np.array(origin)
#     to_target_norm = to_target / np.linalg.norm(to_target)

#     dot_product = np.dot(direction, to_target_norm)
#     angle_deg = np.degrees(np.arccos(np.clip(dot_product, -1.0, 1.0)))

#     return angle_deg <= (fov_deg / 2)


# def add_player_spotted_column(df, vc, fov_deg=90, max_distance=None):
#     df = df.copy()
#     df["player_spotted"] = [[] for _ in range(len(df))]
#     grouped = df.groupby("tick")

#     total_ticks = len(grouped)  # Total number of ticks to process
#     progress_interval = max(1, total_ticks // 10000)  # Interval for printing progress (0.01%)
#     processed_ticks = 0  # Counter for processed ticks

#     for tick, tick_df in grouped:
#         players = tick_df.to_dict("records")

#         for i, player in enumerate(players):
#             pos1 = (player["X"], player["Y"], player["Z"])
#             view_pitch = player["pitch"]
#             view_yaw = player["yaw"]
#             team1 = player["team_name"]

#             spotted = []
#             for j, enemy in enumerate(players):
#                 if player["steamid"] == enemy["steamid"] or enemy["team_name"] == team1:
#                     continue  # Skip self or teammates

#                 pos2 = (enemy["X"], enemy["Y"], enemy["Z"])
#                 dist = np.linalg.norm(np.array(pos1) - np.array(pos2))

#                 if max_distance is not None and dist > max_distance:
#                     continue

#                 if not is_within_fov(pos1, pos2, view_pitch, view_yaw, fov_deg):
#                     continue

#                 if vc.is_visible(pos1, pos2):
#                     spotted.append(enemy["name"])
#             df.loc[(df["tick"] == tick) & (df["steamid"] == player["steamid"]), "player_spotted"] = ", ".join(spotted)
#             processed_ticks += 1
#             if processed_ticks % progress_interval == 0:
#                 percent = (processed_ticks / total_ticks) * 100
#                 print(f"Progress: {percent:.2f}%")
#     return df


# start = time.time()
# spotted_df = add_player_spotted_column(df, vc)
# end = time.time()
# print(end - start)
# first_spotted = spotted_df[spotted_df["player_spotted"].apply(len) > 0].iloc[0]
# print(f'{first_spotted["name"]} {first_spotted["player_spotted"]}')

# unique_usernames = df["name"].unique()
# for username in unique_usernames:
#     attacker_ticks = spotted_df[spotted_df["name"] == username]

#     attacker_fire = weapon_fire_df[weapon_fire_df["user_name"] == username]
#     attacker_hit = player_hurt_df[player_hurt_df["attacker_name"] == username]

#     # Get the set of ticks where enemies were spotted
#     spotted_ticks = set(attacker_ticks["tick"])

#     # Filter attacker_fire to only include rows with ticks in spotted_ticks
#     shots_when_spotted = attacker_fire[attacker_fire["tick"].isin(spotted_ticks)]
#     hits_when_spotted = attacker_hit[attacker_hit["tick"].isin(spotted_ticks)]

#     accuracy_spotted = len(attacker_hit) / len(shots_when_spotted)
#     print(f"{username} accuracy: {accuracy_spotted}")
