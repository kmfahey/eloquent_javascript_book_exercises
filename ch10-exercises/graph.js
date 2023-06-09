
// Converts an edge list to an adjacency list.
function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

exports.buildGraph = buildGraph;
