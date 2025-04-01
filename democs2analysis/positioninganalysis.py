import pandas as pd
from demoparser2 import DemoParser

# Path to your CS2 demo file
demo_path = "D:/Demos/DightedTestDemo.dem"

# Initialize the parser
parser = DemoParser(demo_path)

player_death_df = parser.parse_event("player_death", player=["X", "Y"], other=["total_rounds_played"])

# Track all unique players
all_players = set(player_death_df["user_name"].dropna())


def calculate_opening_kills(player_death_events):
    """Calculate each player's opening kills."""
    opening_kills = {}
    # Loop through player_death events
    for _, event in player_death_events.iterrows():
        round_num = event["total_rounds_played"]

        # If this round doesn't have an opening kill yet, store the first one
        if round_num not in opening_kills:
            opening_kills[round_num] = {
                "Round": round_num,
                "Killer": event["attacker_name"],
                "Killer_SteamID": event["attacker_steamid"]
            }

    # Convert to DataFrame
    return pd.DataFrame(opening_kills.values())


opening_kills = calculate_opening_kills(player_death_df)


def calculate_trade_kills(player_death_events):
    """Calculate how many trade kills each player had."""
    prev_event = None
    trade_window = 320  # The window of time in which we consider a kill to be a trade (in ticks, 64 = 1 second)
    trade_kills = []
    for _, event in player_death_events.iterrows():
        # First kill event
        if prev_event is None:
            prev_event = event
            continue
        # If it's the next round, then we don't count it as a trade kill
        if prev_event["total_rounds_played"] != event["total_rounds_played"]:
            prev_event = event
            continue
        # If the previous attacker is not the victim now, then this is not a trade kill
        if prev_event["attacker_name"] != event["user_name"]:
            prev_event = event
            continue
        # Calculate the time between 2 consecutive player deaths
        trade_time = event["tick"] - prev_event["tick"]
        # If the trade time is more than the previously defined window, then this is not a trade kill
        if trade_time > trade_window:
            prev_event = event
            continue
        # Now that we passed the 2 checks, we finally have a trade kill
        trade_kills.append(event.to_dict())
        prev_event = event

    trade_kills_df = pd.DataFrame(trade_kills)
    return trade_kills_df


trade_kills = calculate_trade_kills(player_death_df)


def calculate_player_traded_deaths(player_death_events, username):
    """Calculate player's traded deaths"""
    user_death_event = None
    traded_deaths = []
    for _, event in player_death_events.iterrows():
        # First, we find an event where our player died.
        if user_death_event is None and event["user_name"] == username:
            user_death_event = event
            continue
        # Obligatory
        if user_death_event is None:
            continue
        # If the next player that died isn't the one that killed our player, we reset the user death event and continue
        if user_death_event["attacker_name"] != event["user_name"]:
            user_death_event = None
            continue
        # If we pass the checks, then we can add the event to the traded death list
        traded_deaths.append(event.to_dict())

    traded_deaths_df = pd.DataFrame(traded_deaths)
    return traded_deaths_df


traded_deaths = calculate_player_traded_deaths(player_death_df, username="Dighted")


def calculate_player_multi_kills(player_death_events):
    """Calculate how many multi kills a player had.
    Multi kill - when you have more than 1 kill in a round."""
    kills_per_round = (
        player_death_events
        .groupby(["total_rounds_played", "attacker_name"])
        .size()  # Count occurrences
        .reset_index(name="kills")  # Rename count column to "kills"
    )
    multi_kills_per_round = kills_per_round[kills_per_round["kills"] > 1]
    return multi_kills_per_round


multi_kills = calculate_player_multi_kills(player_death_df)


