import { Layer, LayerMap, BackedgeMap } from "../types";

export function buildTreeLayers(
  nodes: string[],
  adj: Map<string, string[]>,
  rev: Map<string, string[]>,
): [LayerMap, BackedgeMap] {
  // Initialize the layerMap and backedgeMap
  let layerMap: LayerMap = new Map<string, Layer>();
  let backedgeMap: BackedgeMap = new Map<string, boolean>();

  // Create a map to store the children of each node
  let coc = new Map<string, string[]>();

  // Create a set to keep track of visited nodes
  let seen = new Set<string>();

  // Variable to store the maximum depth of the tree
  let maxDepth = 0;

  // Initialize the coc map with empty arrays for each node
  for (const u of nodes) {
    coc.set(u, []);
  }

  // Populate the coc map with children for each node from the adj map
  for (const [u, vs] of adj.entries()) {
    for (const v of vs) {
      if (!coc.get(u)!.includes(v)) {
        coc.set(u, [...coc.get(u)!, v]);
      }
    }
  }

  // Populate the coc map with children for each node from the rev map
  for (const [u, vs] of rev.entries()) {
    for (const v of vs) {
      if (!coc.get(u)!.includes(v)) {
        coc.set(u, [...coc.get(u)!, v]);
      }
    }
  }

  // Recursive function to find the maximum depth of the tree
  const findMaxDepth = (u: string, depth: number): void => {
    seen.add(u);
    maxDepth = Math.max(maxDepth, depth);
    for (const v of coc.get(u)!) {
      if (!seen.has(v)) {
        findMaxDepth(v, depth + 1);
      }
    }
  };

  // Recursive function to build the layers of the tree
  const buildLayers = (u: string, depth: number): void => {
    seen.add(u);
    layerMap.set(u, [depth, maxDepth]);
    for (const v of coc.get(u)!) {
      const e1 = [u, v].join(" ");
      const e2 = [v, u].join(" ");
      if (!seen.has(v)) {
        buildLayers(v, depth + 1);
        backedgeMap.set(e1, false);
        backedgeMap.set(e2, false);
      } else {
        backedgeMap.set(e1, true);
        backedgeMap.set(e2, true);
      }
    }
  };

  // Iterate through each node and build the layers if not already built
  for (const u of nodes) {
    if (!layerMap.has(u)) {
      maxDepth = 0;
      seen.clear();
      findMaxDepth(u, 1);
      seen.clear();
      buildLayers(u, 1);
    }
  }

  return [layerMap, backedgeMap];
}
