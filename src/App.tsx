import { InputTabs } from "./components/InputTabs";

import { GraphCanvas } from "./components/GraphCanvas";
import { GraphSettings } from "./components/GraphSettings";

import { InitScreen } from "./components/InitScreen";
import { RandomizerScreen } from "./components/RandomizerScreen";

import { Settings } from "./types";
import { SettingsFormat } from "./types";
import { TestCase, TestCases } from "./types";
import { Randomizer } from "./types";
import { SettingsFormatList } from "./types";

import { getDefaultGraph } from "./components/utils";

import { useState } from "react";

function App() {
  const [testCaseNumber, setTestCaseNumber] = useState<number>(0);
  const [currentId, setCurrentId] = useState<number>(0);
  const [testCases, setTestCases] = useState<TestCases>(() => {
    const init = new Map<number, TestCase>();
    init.set(0, {
      graphEdges: getDefaultGraph(),
      graphParChild: getDefaultGraph(),
      inputFormat: "edges",
    });
    return init;
  });

  const [directed, setDirected] = useState<boolean>(false);

  const [tabs, setTabs] = useState<number[]>([0]);
  const [inputs, setInputs] = useState<number[]>([0]);

  const [settings, setSettings] = useState<Settings>({
    drawMode: "node",
    expandedCanvas: false,
    markBorder: "double",
    markColor: 1,
    labelOffset: 0,
    darkMode:
      localStorage.getItem("darkMode") !== null
        ? localStorage.getItem("darkMode") === "true"
        : false,
    nodeRadius:
      localStorage.getItem("nodeRadius") !== null
        ? Number.parseInt(localStorage.getItem("nodeRadius")!)
        : 21,
    fontSize:
      localStorage.getItem("fontSize") !== null
        ? Number.parseInt(localStorage.getItem("fontSize")!)
        : 15,
    nodeBorderWidthHalf:
      localStorage.getItem("nodeBorderWidthHalf") !== null
        ? Number.parseFloat(localStorage.getItem("nodeBorderWidthHalf")!)
        : 1,
    edgeBorderWidthHalf:
      localStorage.getItem("edgeBorderWidthHalf") !== null
        ? Number.parseFloat(localStorage.getItem("edgeBorderWidthHalf")!)
        : 1,
    edgeLength:
      localStorage.getItem("edgeLength") !== null
        ? Number.parseFloat(localStorage.getItem("edgeLength")!)
        : 80,
    edgeLabelSeparation:
      localStorage.getItem("edgeLabelSeparation") !== null
        ? Number.parseFloat(localStorage.getItem("edgeLabelSeparation")!)
        : 14,
    penThickness:
      localStorage.getItem("penThickness") !== null
        ? Number.parseFloat(localStorage.getItem("penThickness")!)
        : 1,
    penTransparency:
      localStorage.getItem("penTransparency") !== null
        ? Number.parseFloat(localStorage.getItem("penTransparency")!)
        : 0,
    eraserRadius:
      localStorage.getItem("eraserRadius") !== null
        ? Number.parseFloat(localStorage.getItem("eraserRadius")!)
        : 10,
    tension:
      localStorage.getItem("tension") !== null
        ? Number.parseFloat(localStorage.getItem("tension")!)
        : 1.6,
    nodeRepulsion:
      localStorage.getItem("nodeRepulsion") !== null
        ? Number.parseFloat(localStorage.getItem("nodeRepulsion")!)
        : 0.24,
    testCaseBoundingBoxes: true,
    showComponents: false,
    showEBCC: false,
    showVBCC: false,
    showBridges: false,
    showMSTs: false,
    treeMode: false,
    bipartiteMode: false,
    lockMode: false,
    markedNodes:
      localStorage.getItem("markedNodes") !== null
        ? localStorage.getItem("markedNodes") == "true"
        : false,
    fixedMode: false,
    multiedgeMode: true,
    edgePhysics:
      localStorage.getItem("edgePhysics") !== null
        ? localStorage.getItem("edgePhysics") == "true"
        : true,
    settingsFormat:
      localStorage.getItem("settingsFormat") !== null &&
      SettingsFormatList.includes(
        localStorage.getItem("settingsFormat") as string,
      )
        ? (localStorage.getItem("settingsFormat") as SettingsFormat)
        : "modes",
    gridMode: false,
  });

  const [init, setInit] = useState<boolean>(false);
  const [randomizer, setRandomizer] = useState<boolean>(false);

  const [randomizerConfig, setRandomizerConfig] = useState<Randomizer>({
    indexing:
      localStorage.getItem("randomizerIndexing") !== null
        ? parseInt(localStorage.getItem("randomizerIndexing")!)
        : 0,
    nodeCount:
      localStorage.getItem("randomizerNodeCount") !== null
        ? localStorage.getItem("randomizerNodeCount")!
        : "",
    edgeCount:
      localStorage.getItem("randomizerEdgeCount") !== null
        ? localStorage.getItem("randomizerEdgeCount")!
        : "",
    connected:
      localStorage.getItem("randomizerConnected") !== null
        ? localStorage.getItem("randomizerConnected")! == "true"
        : false,
    tree:
      localStorage.getItem("randomizerTree") !== null
        ? localStorage.getItem("randomizerTree")! == "true"
        : false,
    hasNodeLabel:
      localStorage.getItem("randomizerHasNodeLabel") !== null
        ? localStorage.getItem("randomizerHasNodeLabel")! == "true"
        : false,
    nodeLabelMin:
      localStorage.getItem("randomizerNodeLabelMin") !== null
        ? localStorage.getItem("randomizerNodeLabelMin")!
        : "",
    nodeLabelMax:
      localStorage.getItem("randomizerNodeLabelMax") !== null
        ? localStorage.getItem("randomizerNodeLabelMax")!
        : "",
    hasEdgeLabel:
      localStorage.getItem("randomizerHasEdgeLabel") !== null
        ? localStorage.getItem("randomizerHasEdgeLabel")! == "true"
        : false,
    edgeLabelMin:
      localStorage.getItem("randomizerEdgeLabelMin") !== null
        ? localStorage.getItem("randomizerEdgeLabelMin")!
        : "",
    edgeLabelMax:
      localStorage.getItem("randomizerEdgeLabelMax") !== null
        ? localStorage.getItem("randomizerEdgeLabelMax")!
        : "",
  });

  return (
    <>
      <div
        className={
          settings.darkMode
            ? `dark bg-ovr text-text absolute w-full overflow-scroll
              no-scrollbar`
            : `light bg-ovr text-text absolute w-full overflow-scroll
              no-scrollbar`
        }
      >
        <div
          className="sm:top-2 lg:top-2 sm:right-2 lg:right-2 absolute flex
            space-x-3 font-jetbrains text-base"
        >
          <a
            className="space-x-2 flex border-2 border-border rounded-lg px-2
              py-1 justify-between items-center hover:border-border-hover z-20
              bg-block h-9"
            href="https://github.com/parthDOOM/Lookatthisgraph"
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
        </div>

        {init ? (
          <InitScreen
            setInit={setInit}
            testCaseNumber={testCaseNumber}
            setTestCaseNumber={setTestCaseNumber}
            setTestCases={setTestCases}
            setTabs={setTabs}
            setCurrentId={setCurrentId}
          />
        ) : (
          <></>
        )}

        {randomizer ? (
          <RandomizerScreen
            setRandomizer={setRandomizer}
            randomizerConfig={randomizerConfig}
            setRandomizerConfig={setRandomizerConfig}
          />
        ) : (
          <></>
        )}

        <InputTabs
          tabs={tabs}
          setTabs={setTabs}
          inputs={inputs}
          setInputs={setInputs}
          testCases={testCases}
          setTestCases={setTestCases}
          testCaseNumber={testCaseNumber}
          setTestCaseNumber={setTestCaseNumber}
          currentId={currentId}
          setCurrentId={setCurrentId}
          directed={directed}
          setDirected={setDirected}
          setInit={setInit}
          setRandomizer={setRandomizer}
          randomizerConfig={randomizerConfig}
        />

        <div className="relative z-0">
          <GraphCanvas
            testCases={testCases}
            directed={directed}
            settings={settings}
            setSettings={setSettings}
          />
        </div>

        {settings.expandedCanvas ? (
          <></>
        ) : (
          <GraphSettings
            directed={directed}
            settings={settings}
            setSettings={setSettings}
          />
        )}
      </div>
    </>
  );
}

export default App;
