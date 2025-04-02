import accuracyanalysis
import positioninganalysis
import time
from line_profiler import LineProfiler

demo_path = "D:/Demos/DightedInfernoTest.dem"

profiler = LineProfiler()
profiler.add_function(accuracyanalysis.analyze_all_players)
profiler.add_function(positioninganalysis.analyze_all_players)
profiler.enable()

start_time = time.time()

accuracy_df = accuracyanalysis.analyze_all_players(demo_path)
positioning_df = positioninganalysis.analyze_all_players(demo_path)
profiler.disable()
profiler.print_stats()
end_time = time.time()

accuracy_df.to_excel("accuracytest.xlsx")
positioning_df.to_excel("positioningtest.xlsx")

print(f"Execution time: {end_time - start_time:.6f} seconds")
