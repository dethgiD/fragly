from demoparser2 import DemoParser

attacker_name = "Dighted"

parser = DemoParser("D:/Demos/DightedTestDemo.dem")

weapon_fire_df = parser.parse_event("weapon_fire", player=["X", "Y",])
df = parser.parse_ticks(["pitch", "yaw", "spotted", "X", "Y", "Z", "velocity", "max_speed",
                        "ducked", "approximate_spotted_by", "spotted"])

attacker_shots = weapon_fire_df[weapon_fire_df["user_name"] == attacker_name].sort_values(by="tick")
shot_ticks = set(attacker_shots["tick"])
attacker_df = df[(df["name"] == attacker_name) & (df["tick"].isin(shot_ticks))][
    ["tick", "velocity", "max_speed", "ducked", "approximate_spotted_by", "spotted"]]

attacker_df.to_excel("crouching.xlsx")
attacker_shots.to_excel("fire.xlsx")
