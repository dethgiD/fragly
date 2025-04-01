from demoparser2 import DemoParser

MY_NAME = "Dighted"

parser = DemoParser("D:/Demos/DightedTestDemo.dem")
df = parser.parse_event("player_death", player=["last_place_name"])

df["attacker_name"] = df["attacker_name"]
df["user_name"] = df["user_name"]

my_kills = df[df["attacker_name"] == MY_NAME]
my_deaths = df[df["user_name"] == MY_NAME]

# Get a list of all zones
all_unique_zones = my_kills["attacker_last_place_name"].unique().tolist()
all_unique_zones.extend(my_deaths["user_last_place_name"].unique())


max_tick = parser.parse_event("round_end")["tick"].max()

wanted_fields = ["kills_total", "deaths_total", "mvps", "headshot_kills_total", "ace_rounds_total", "4k_rounds_total", "3k_rounds_total"]
df = parser.parse_ticks(wanted_fields, ticks=[max_tick])
print(df)


for zone in all_unique_zones:
    n_kills = len(my_kills[my_kills["attacker_last_place_name"] == zone])
    n_deaths = len(my_deaths[my_deaths["user_last_place_name"] == zone])

    print(f"{zone}       Kills:{n_kills},       Deaths: {n_deaths}")


steamid_bytes_dict = parser.parse_voice()

for user_name, raw_bytes in steamid_bytes_dict.items():
    with open(f"{user_name}.wav", "wb") as f:
        f.write(raw_bytes)