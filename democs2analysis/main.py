from accuracyanalysis import analyze_all_players
import time
from line_profiler import LineProfiler

demo_path = "D:/Demos/DightedTestDemo.dem"

profiler = LineProfiler()
profiler.add_function(analyze_all_players)
profiler.enable()

start_time = time.time()

accuracy_df = analyze_all_players(demo_path)
profiler.disable()
profiler.print_stats()
end_time = time.time()

accuracy_df.to_excel("test123.xlsx")

print(f"Execution time: {end_time - start_time:.6f} seconds")
