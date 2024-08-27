import { GraphInput } from "./components/GraphInput";
import { GraphCanvas } from "./components/GraphCanvas";
import { GraphSettings } from "./components/GraphSettings";

import { InputFormat, Settings } from "./types";
import { Graph } from "./types";

import { useState } from "react";

function App() {
  // State for graph edges
  const [graphEdges, setGraphEdges] = useState<Graph>({
    nodes: new Array<string>(),
    adj: new Map<string, string[]>(),
    rev: new Map<string, string[]>(),
    edges: new Array<string>(),
    edgeLabels: new Map<string, string>(),
    nodeLabels: new Map<string, string>(),
  });

  // State for graph parent-child relationship
  const [graphParChild, setGraphParChild] = useState<Graph>({
    nodes: new Array<string>(),
    adj: new Map<string, string[]>(),
    rev: new Map<string, string[]>(),
    edges: new Array<string>(),
    edgeLabels: new Map<string, string>(),
    nodeLabels: new Map<string, string>(),
  });

  // State for input format (edges or parent-child)
  const [inputFormat, setInputFormat] = useState<InputFormat>("edges");

  // State for directed graph
  const [directed, setDirected] = useState<boolean>(false);

  // State for graph settings
  const [settings, setSettings] = useState<Settings>({
    labelOffset: 0,
    darkMode:
      localStorage.getItem("darkMode") !== null
        ? localStorage.getItem("darkMode") === "true"
        : false,
    nodeRadius:
      localStorage.getItem("nodeRadius") !== null
        ? Number.parseInt(localStorage.getItem("nodeRadius")!)
        : 16,
    nodeBorderWidthHalf:
      localStorage.getItem("nodeBorderWidthHalf") !== null
        ? Number.parseFloat(localStorage.getItem("nodeBorderWidthHalf")!)
        : 1,
    edgeLength:
      localStorage.getItem("edgeLength") !== null
        ? Number.parseFloat(localStorage.getItem("edgeLength")!)
        : 10,
    showComponents: false,
    showBridges: false,
    treeMode: false,
    lockMode: false,
  });

  return (
    <>
      <div
        // Container div with dynamic class based on dark mode setting
        className={
          settings.darkMode
            ? "dark bg-black text-gray-100 absolute w-full min-h-200 overflow-hidden p-6 shadow-lg"
            : "light bg-gray-50 text-gray-850 absolute w-full min-h-200 overflow-hidden p-6 shadow-md"
        }
      >
        {/* Github link */}
        <a
          className="font-jetbrains text-sm flex sm:top-2 lg:top-2 sm:right-2
            lg:right-2 absolute border-2 border-border rounded-lg px-2 py-1
            justify-between items-center hover:border-border-hover z-10"
          href="https://github.com/parthDOOM"
        >
          {settings.darkMode ? (
            <img
              width={18}
              src="github-mark/github-mark-white.svg"
              alt="Github Logo"
            />
          ) : (
            <img
              width={18}
              src="github-mark/github-mark.svg"
              alt="Github Logo"
            />
          )}
          <div className="ml-2">Github</div>
        </a>

        {/* Graph input component */}
        <GraphInput
          graphEdges={graphEdges}
          setGraphEdges={setGraphEdges}
          graphParChild={graphParChild}
          setGraphParChild={setGraphParChild}
          inputFormat={inputFormat}
          setInputFormat={setInputFormat}
          directed={directed}
          setDirected={setDirected}
        />

        <div className="relative z-0">
          {/* Graph canvas for edges input format */}
          <GraphCanvas
            graph={graphEdges}
            inputFormatToRender={"edges"}
            inputFormat={inputFormat}
            directed={directed}
            settings={settings}
          />

          {/* Graph canvas for parent-child input format */}
          <GraphCanvas
            graph={graphParChild}
            inputFormatToRender={"parentChild"}
            inputFormat={inputFormat}
            directed={directed}
            settings={settings}
          />
        </div>

        {/* Graph settings component */}
        <GraphSettings
          directed={directed}
          settings={settings}
          setSettings={setSettings}
        />
      </div>
    </>
  );
}

export default App;