import pandas as pd
from demoparser2 import DemoParser


def analyze_all_players(demo_path):
    """
    Calculate various performance metrics for all players in a CS2 demo and return a dataframe.
    The metrics include:
      - Opening kills (first kill of each round)
      - Trade kills (killing someone who just killed a teammate)
      - Traded deaths (when your death is traded by a teammate)
      - Multi kills (more than one kill in a round)
    """
    # Initialize the parser
    parser = DemoParser(demo_path)

    # Parse player death events
    player_death_df = parser.parse_event("player_death", player=["X", "Y"],
                                         other=["total_rounds_played", "game_phase"])

    # Filter out events with game_phase = 1 (typically knife/warmup)
    player_death_df = player_death_df[player_death_df["game_phase"] != 1]

    # Get all unique players
    all_players = set(player_death_df["user_name"].dropna()) | set(player_death_df["attacker_name"].dropna())
    all_players = {p for p in all_players if isinstance(p, str) and p}  # Filter out None and empty strings

    # Calculate opening kills for reference
    opening_kills_df = calculate_opening_kills(player_death_df)

    # Calculate trade kills for reference
    trade_kills_df = calculate_trade_kills(player_death_df)

    # Calculate multi kills for reference
    multi_kills_df = calculate_player_multi_kills(player_death_df)

    all_data = []  # List to store player results

    for username in all_players:
        # Get player's traded deaths
        traded_deaths_df = calculate_player_traded_deaths(player_death_df, username)

        # Count opening kills
        opening_kill_count = len(opening_kills_df[opening_kills_df["Killer"] == username])

        # Count trade kills
        trade_kill_count = len(trade_kills_df[trade_kills_df["attacker_name"] == username])

        # Count traded deaths
        traded_death_count = len(traded_deaths_df)

        # Count multi kills and total kills in those multi-kill rounds
        player_multi_kills = multi_kills_df[multi_kills_df["attacker_name"] == username]
        multi_kill_rounds = len(player_multi_kills)

        # Count total deaths
        total_deaths = len(player_death_df[player_death_df["user_name"] == username])

        # Count total kills
        total_kills = len(player_death_df[player_death_df["attacker_name"] == username])

        # Calculate percentage of deaths that were traded
        traded_death_percentage = (traded_death_count / total_deaths) if total_deaths > 0 else 0

        # Calculate precentage of trade kills
        trade_kill_percentage = (trade_kill_count / total_kills) if total_kills > 0 else 0

        # Calculate percentage of multi-kill rounds
        total_rounds = player_death_df["total_rounds_played"].max()
        multi_kill_percentage = (multi_kill_rounds / total_rounds) if total_rounds > 0 else 0

        all_data.append({
            "username": username,
            "total_kills": total_kills,
            "total_deaths": total_deaths,
            "opening_kills": opening_kill_count,
            "trade_kills": trade_kill_count,
            "trade_kill_percentage": round(trade_kill_percentage, 4),
            "traded_deaths": traded_death_count,
            "traded_death_percentage": round(traded_death_percentage, 4),
            "multi_kill_rounds": multi_kill_rounds,
            "multi_kill_percentage": round(multi_kill_percentage, 4)
        })

    # Convert the collected data into a DataFrame
    result_df = pd.DataFrame(all_data)

    # Sort by total kills (descending)
    result_df = result_df.sort_values(by="total_kills", ascending=False)

    return result_df


def calculate_opening_kills(player_death_events):
    """Calculate each player's opening kills."""
    opening_kills = {}

    # Sort events by tick to ensure chronological order
    sorted_events = player_death_events.sort_values(by=["total_rounds_played", "tick"])

    # Loop through player_death events
    for _, event in sorted_events.iterrows():
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


def calculate_trade_kills(player_death_events):
    """Calculate how many trade kills each player had."""
    prev_event = None
    trade_window = 320  # The window of time in which we consider a kill to be a trade (in ticks, 64 = 1 second)
    trade_kills = []

    # Sort events by tick to ensure chronological order
    sorted_events = player_death_events.sort_values(by=["total_rounds_played", "tick"])

    for _, event in sorted_events.iterrows():
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


def calculate_player_traded_deaths(player_death_events, username):
    """Calculate player's traded deaths"""
    user_death_event = None
    traded_deaths = []
    trade_window = 320  # Same trade window as for trade kills

    # Sort events by tick to ensure chronological order
    sorted_events = player_death_events.sort_values(by=["total_rounds_played", "tick"])

    for _, event in sorted_events.iterrows():
        # If we have a stored death event, check if it's too old (beyond trade window)
        if user_death_event is not None:
            if event["total_rounds_played"] != user_death_event["total_rounds_played"] or \
                    event["tick"] - user_death_event["tick"] > trade_window:
                user_death_event = None

        # First, we find an event where our player died.
        if user_death_event is None and event["user_name"] == username:
            user_death_event = event
            continue

        # If we don't have a death event stored, continue
        if user_death_event is None:
            continue

        # If the next player that died isn't the one that killed our player, we continue
        if user_death_event["attacker_name"] != event["user_name"]:
            continue

        # If we pass the checks, then we can add the event to the traded death list
        traded_deaths.append(user_death_event.to_dict())
        user_death_event = None  # Reset so we don't count it again

    traded_deaths_df = pd.DataFrame(traded_deaths)
    return traded_deaths_df


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