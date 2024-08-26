export interface Graph {
  nodes: string[]; // Array of node names
  adj: Map<string, string[]>; // Adjacency map representing the connections between nodes
  rev: Map<string, string[]>; // Reverse adjacency map representing the reverse connections between nodes
  edges: string[]; // Array of edge names
  edgeLabels: Map<string, string>; // Map of edge names to their labels
  nodeLabels: Map<string, string>; // Map of node names to their labels
}

export interface Settings {
  labelOffset: number; // Offset for label positioning
  darkMode: boolean; // Flag indicating whether dark mode is enabled
  nodeRadius: number; // Radius of nodes
  nodeBorderWidthHalf: number; // Half of the border width of nodes
  showComponents: boolean; // Flag indicating whether to show components
  showBridges: boolean; // Flag indicating whether to show bridges
  treeMode: boolean; // Flag indicating whether tree mode is enabled
  lockMode: boolean; // Flag indicating whether lock mode is enabled
}

export interface ParsedGraph {
  status: "OK" | "BAD"; // Status of the parsed graph
  graph?: Graph; // Optional graph object
}

export type ColorMap = Map<string, number>; // Map of node names to color values

export type CutMap = Map<string, boolean>; // Map of node names to cut values

export type Layer = [number, number]; // Tuple representing a layer

export type LayerMap = Map<string, Layer>; // Map of node names to layers

export type BackedgeMap = Map<string, boolean>; // Map of node names to backedge values
export type BridgeMap = Map<string, boolean>; // Map of node names to bridge values
