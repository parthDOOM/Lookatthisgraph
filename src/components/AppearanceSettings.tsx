import { Settings } from "../types";
import { SettingsToggleSection } from "./SettingsToggleSection";

interface Props {
  directed: boolean;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export function AppearanceSettings({ settings, setSettings }: Props) {
  return (
    <>
      <div
        className={
          settings.settingsFormat === "appearance"
            ? `font-jetbrains flex flex-col border-2 rounded-lg bg-block
              shadow-shadow shadow border-border hover:border-border-hover p-3
              space-y-3`
            : "hidden"
        }
      >
        <SettingsToggleSection
          title={"Theme"}
          leftLabel={"Light"}
          rightLabel={"Dark"}
          toggleId={"settingsTheme"}
          settingsName={"darkMode"}
          settings={settings}
          setSettings={setSettings}
        />

        <SettingsToggleSection
          title={"Testcase Bounding Boxes"}
          leftLabel={"Hide"}
          rightLabel={"Show"}
          toggleId={"settingsBoundingBoxes"}
          settingsName={"testCaseBoundingBoxes"}
          settings={settings}
          setSettings={setSettings}
        />

        <hr className="border-dashed border-border" />

        <h4 className="font-semibold">
          {"Node Radius"}
        </h4>
        <input
          type="range"
          min={0}
          max={15}
          step={1}
          value={settings.nodeRadius - 16}
          className="range appearance-none outline-none bg-slider h-1 w-5/6
            self-center rounded-full cursor-ew-resize
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:border-none
            [&::-webkit-slider-thumb]:bg-slider-thumb
            [&::-webkit-slider-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-slider-thumb [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:rounded-full"
          onChange={(e) => {
            const newRadius = 16 + Number.parseInt(e.target.value);
            setSettings({
              ...settings,
              nodeRadius: newRadius,
            });
            localStorage.setItem("nodeRadius", newRadius.toString());
          }}
        />

        <h4 className="font-semibold">
          {"Font Size"}
        </h4>
        <input
          type="range"
          min={0}
          max={15}
          step={1}
          value={settings.fontSize - 10}
          className="range appearance-none outline-none bg-slider h-1 w-5/6
            self-center rounded-full cursor-ew-resize
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:border-none
            [&::-webkit-slider-thumb]:bg-slider-thumb
            [&::-webkit-slider-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-slider-thumb [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:rounded-full"
          onChange={(e) => {
            const newFontSize = 10 + Number.parseInt(e.target.value);
            setSettings({
              ...settings,
              fontSize: newFontSize,
            });
            localStorage.setItem("fontSize", newFontSize.toString());
          }}
        />

        <h4 className="font-semibold">
          Line Thickness (Node)
        </h4>
        <input
          type="range"
          min={0}
          max={1.5}
          step={0.1}
          value={settings.nodeBorderWidthHalf - 1}
          className="range appearance-none outline-none bg-slider h-1 w-5/6
            self-center rounded-full cursor-ew-resize
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:border-none
            [&::-webkit-slider-thumb]:bg-slider-thumb
            [&::-webkit-slider-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-slider-thumb [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:rounded-full"
          onChange={(e) => {
            const newBorderWidthHalf = 1 + Number.parseFloat(e.target.value);
            setSettings({
              ...settings,
              nodeBorderWidthHalf: newBorderWidthHalf,
            });
            localStorage.setItem(
              "nodeBorderWidthHalf",
              newBorderWidthHalf.toString(),
            );
          }}
        />

        <h4 className="font-semibold">
          Line Thickness (Edge)
        </h4>
        <input
          type="range"
          min={0}
          max={1.5}
          step={0.1}
          value={settings.edgeBorderWidthHalf - 1}
          className="range appearance-none outline-none bg-slider h-1 w-5/6
            self-center rounded-full cursor-ew-resize
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:border-none
            [&::-webkit-slider-thumb]:bg-slider-thumb
            [&::-webkit-slider-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-slider-thumb [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:rounded-full"
          onChange={(e) => {
            const newBorderWidthHalf = 1 + Number.parseFloat(e.target.value);
            setSettings({
              ...settings,
              edgeBorderWidthHalf: newBorderWidthHalf,
            });
            localStorage.setItem(
              "edgeBorderWidthHalf",
              newBorderWidthHalf.toString(),
            );
          }}
        />

        <h4 className="font-semibold">
          {"Edge Length"}
        </h4>
        <input
          type="range"
          min={0}
          max={150}
          step={5}
          value={settings.edgeLength - 10}
          className="range appearance-none outline-none bg-slider h-1 w-5/6
            self-center rounded-full cursor-ew-resize
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:border-none
            [&::-webkit-slider-thumb]:bg-slider-thumb
            [&::-webkit-slider-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-slider-thumb [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:rounded-full"
          onChange={(e) => {
            const newEdgeLength = 10 + Number.parseInt(e.target.value);
            setSettings({
              ...settings,
              edgeLength: newEdgeLength,
            });
            localStorage.setItem("edgeLength", newEdgeLength.toString());
          }}
        />

        <h4 className="font-semibold">
          Edge Label Separation
        </h4>
        <input
          type="range"
          min={0}
          max={15}
          step={1}
          value={settings.edgeLabelSeparation - 10}
          className="range appearance-none outline-none bg-slider h-1 w-5/6
            self-center rounded-full cursor-ew-resize
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:border-none
            [&::-webkit-slider-thumb]:bg-slider-thumb
            [&::-webkit-slider-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-slider-thumb [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:rounded-full"
          onChange={(e) => {
            const newEdgeLabelSeparation = 10 + Number.parseInt(e.target.value);
            setSettings({
              ...settings,
              edgeLabelSeparation: newEdgeLabelSeparation,
            });
            localStorage.setItem(
              "edgeLabelSeparation",
              newEdgeLabelSeparation.toString(),
            );
          }}
        />

        <br />
        <hr className="border-dashed border-border" />

        <h4 className="font-semibold">
          {"Pen Thickness"}
        </h4>
        <input
          type="range"
          min={0}
          max={45}
          step={3}
          value={settings.penThickness - 1}
          className="range appearance-none outline-none bg-slider h-1 w-5/6
            self-center rounded-full cursor-ew-resize
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:border-none
            [&::-webkit-slider-thumb]:bg-slider-thumb-canvas
            [&::-webkit-slider-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-slider-thumb-canvas
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full"
          onChange={(e) => {
            const newPenThickness = 1 + Number.parseInt(e.target.value);
            setSettings({
              ...settings,
              penThickness: newPenThickness,
            });
            localStorage.setItem("penThickness", newPenThickness.toString());
          }}
        />

        <h4 className="font-semibold">
          {"Pen Transparency"}
        </h4>
        <input
          type="range"
          min={0}
          max={90}
          step={6}
          value={settings.penTransparency}
          className="range appearance-none outline-none bg-slider h-1 w-5/6
            self-center rounded-full cursor-ew-resize
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:border-none
            [&::-webkit-slider-thumb]:bg-slider-thumb-canvas
            [&::-webkit-slider-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-slider-thumb-canvas
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full"
          onChange={(e) => {
            const newPenTransparency = Number.parseInt(e.target.value);
            setSettings({
              ...settings,
              penTransparency: newPenTransparency,
            });
            localStorage.setItem(
              "penTransparency",
              newPenTransparency.toString(),
            );
          }}
        />

        <h4 className="font-semibold">
          {"Eraser Radius"}
        </h4>
        <input
          type="range"
          min={0}
          max={90}
          step={6}
          value={settings.eraserRadius - 10}
          className="range appearance-none outline-none bg-slider h-1 w-5/6
            self-center rounded-full cursor-ew-resize
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:border-none
            [&::-webkit-slider-thumb]:bg-slider-thumb-canvas
            [&::-webkit-slider-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-slider-thumb-canvas
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full"
          onChange={(e) => {
            const newEraserRadius = 10 + Number.parseInt(e.target.value);
            setSettings({
              ...settings,
              eraserRadius: newEraserRadius,
            });
            localStorage.setItem("eraserRadius", newEraserRadius.toString());
          }}
        />

        <br />
        <hr className="border-dashed border-border" />

        <h4 className="font-semibold">
          {"Edge Tension"}
        </h4>
        <input
          type="range"
          min={0}
          max={0.75}
          step={0.05}
          value={settings.tension - 1.0}
          className="range appearance-none outline-none bg-slider h-1 w-5/6
            self-center rounded-full cursor-ew-resize
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:border-none
            [&::-webkit-slider-thumb]:bg-slider-thumb-physics
            [&::-webkit-slider-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-slider-thumb-physics
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full"
          onChange={(e) => {
            const newTension = 1.0 + Number.parseFloat(e.target.value);
            setSettings({
              ...settings,
              tension: newTension,
            });
            localStorage.setItem("tension", newTension.toString());
          }}
        />

        <h4 className="font-semibold">
          {"Node Repulsion"}
        </h4>
        <input
          type="range"
          min={0}
          max={0.9}
          step={0.06}
          value={settings.nodeRepulsion}
          className="range appearance-none outline-none bg-slider h-1 w-5/6
            self-center rounded-full cursor-ew-resize
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:border-none
            [&::-webkit-slider-thumb]:bg-slider-thumb-physics
            [&::-webkit-slider-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-slider-thumb-physics
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full"
          onChange={(e) => {
            const newNodeRepulsion = Number.parseFloat(e.target.value);
            setSettings({
              ...settings,
              nodeRepulsion: newNodeRepulsion,
            });
            localStorage.setItem("nodeRepulsion", newNodeRepulsion.toString());
          }}
        />
      </div>
    </>
  );
}
