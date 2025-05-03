from demoparser2 import DemoParser
import numpy as np
from awpy.visibility import VisibilityChecker
from awpy.data import TRIS_DIR
import pandas as pd
from math import sqrt
from typing import Dict, Tuple
import multiprocessing as mp
from tqdm import tqdm
import time
import concurrent.futures

parser = DemoParser("D:/Demos/DightedInfernoTest.dem")
username = "Dighted"
header = parser.parse_header()
map_tri = TRIS_DIR / (header["map_name"] + ".tri")
print(map_tri)
vc = VisibilityChecker(path=map_tri)
# tris = VisibilityChecker.read_tri_file(map_tri)
# print("Constructing visibility checker...")
# vc = VisibilityChecker(triangles=tris)
weapon_fire_df = parser.parse_event("weapon_fire", player=["X", "Y", "Z"])
player_death_df = parser.parse_event("player_death", player=["X", "Y", "Z"])
player_hurt_df = parser.parse_event("player_hurt", player=["X", "Y", "Z"])
bomb_planted_df = parser.parse_event("bomb_planted", player=["X", "Y", "Z"], other=["team_rounds_total"])
df = parser.parse_ticks(["pitch", "yaw",  "X", "Y", "Z", "team_name", "team_rounds_total", "rank"])

hurting = player_hurt_df[player_hurt_df["attacker_name"] == username]
firing = weapon_fire_df[weapon_fire_df["user_name"] == username]

ticks = hurting["tick"].unique()
visible = []
for tick in ticks:
    row = hurting[hurting["tick"] == tick].iloc[0]
    player_pos = (int(row["attacker_X"]), int(row["attacker_Y"]), int(row["attacker_Z"]))
    victim_pos = (int(row["user_X"]), int(row["user_Y"]), int(row["user_Z"]))
    print("===========================================")
    print(f'player position: {player_pos}')
    print(f'victim pos: {victim_pos}')
    visibility = vc.is_visible(victim_pos, player_pos)
    print(f'Is visible: {visibility}')
    visible.append(visibility)


# Map the results back into the hurting dataframe
tick_to_visible = dict(zip(ticks, visible))
hurting["visible"] = hurting["tick"].map(tick_to_visible)
hurting.to_excel("visibility_checker.xlsx")
