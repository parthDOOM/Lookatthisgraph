import { Settings } from "../types";
import { SettingsToggleSection } from "./SettingsToggleSection";
import { SettingsToggleSectionDimmed } from "./SettingsToggleSectionDimmed";

interface Props {
  directed: boolean;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export function AlgorithmSettings({ directed, settings, setSettings }: Props) {
  return (
    <>
      <div
        className={
          settings.settingsFormat === "algos"
            ? `font-jetbrains flex flex-col border-2 rounded-lg bg-block
              shadow-shadow shadow border-border hover:border-border-hover p-3
              space-y-3`
            : "hidden"
        }
      >
        <SettingsToggleSection
          title={"Components"}
          leftLabel={"Hide"}
          rightLabel={"Show"}
          toggleId={"settingsComponents"}
          settingsName={"showComponents"}
          settings={settings}
          setSettings={setSettings}
        />

        {!directed ? (
          <SettingsToggleSection
            title={"Edge-Biconnected Components"}
            leftLabel={"Hide"}
            rightLabel={"Show"}
            toggleId={"settingsEBCC"}
            settingsName={"showEBCC"}
            settings={settings}
            setSettings={setSettings}
          />
        ) : (
          <></>
        )}

        {!directed ? (
          <SettingsToggleSection
            title={"Vertex-Biconnected Components"}
            leftLabel={"Hide"}
            rightLabel={"Show"}
            toggleId={"settingsVBCC"}
            settingsName={"showVBCC"}
            settings={settings}
            setSettings={setSettings}
          />
        ) : (
          <></>
        )}

        {!directed ? (
          <SettingsToggleSection
            title={"Bridges and Cut Vertices"}
            leftLabel={"Hide"}
            rightLabel={"Show"}
            toggleId={"settingsBridges"}
            settingsName={"showBridges"}
            settings={settings}
            setSettings={setSettings}
          />
        ) : (
          <></>
        )}

        {!directed && localStorage.getItem("isEdgeNumeric") === "true" ? (
          <SettingsToggleSection
            title={"Minimum Spanning Tree(s)"}
            leftLabel={"Hide"}
            rightLabel={"Show"}
            toggleId={"settingsShowMSTs"}
            settingsName={"showMSTs"}
            settings={settings}
            setSettings={setSettings}
          />
        ) : !directed ? (
          <SettingsToggleSectionDimmed
            title={"Minimum Spanning Tree(s)"}
            leftLabel={"Hide"}
            rightLabel={"Show"}
            toggleId={"settingsShowMSTs"}
            settingsName={"showMSTs"}
            settings={settings}
            setSettings={setSettings}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
