import { ColorMap } from "../types";

// Function to build components using depth-first search
export function buildComponents(
  nodes: string[],
  adj: Map<string, string[]>,
  rev: Map<string, string[]>,
): ColorMap {
  let colorMap: ColorMap = new Map<string, number>();
  let color = 1;

  // Depth-first search function
  const dfs = (u: string): void => {
    colorMap.set(u, color);
    for (const v of adj.get(u)!) {
      if (!colorMap.has(v)) {
        dfs(v);
      }
    }
    for (const v of rev.get(u)!) {
      if (!colorMap.has(v)) {
        dfs(v);
      }
    }
  };

  // Iterate through each node and perform depth-first search if not visited
  for (const u of nodes) {
    if (!colorMap.has(u)) {
      dfs(u);
      color++;
    }
  }

  return colorMap;
}

// Function to build strongly connected components using depth-first search
export function buildSCComponents(
  nodes: string[],
  adj: Map<string, string[]>,
  rev: Map<string, string[]>,
): ColorMap {
  let colorMap: ColorMap = new Map<string, number>();
  let color = 1;
  let stack: string[] = [];

  // Function to build stack using depth-first search
  const buildStack = (u: string): void => {
    colorMap.set(u, 0);
    for (const v of adj.get(u)!) {
      if (!colorMap.has(v)) {
        buildStack(v);
      }
    }
    stack.push(u);
  };

  // Iterate through each node and build stack if not visited
  for (const u of nodes) {
    if (!colorMap.has(u)) {
      buildStack(u);
    }
  }

  stack.reverse();

  // Depth-first search function
  const dfs = (u: string): void => {
    colorMap.set(u, color);
    for (const v of rev.get(u)!) {
      if (colorMap.get(v)! === 0) {
        dfs(v);
      }
    }
  };

  // Perform depth-first search on nodes in the stack
  for (const u of stack) {
    if (colorMap.get(u)! === 0) {
      dfs(u);
      color++;
    }
  }

  return colorMap;
}