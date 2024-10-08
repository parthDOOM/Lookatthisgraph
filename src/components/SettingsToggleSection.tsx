import { Settings } from "../types";

interface Props {
  title: string;
  leftLabel: string;
  rightLabel: string;
  toggleID: string;
  settingsName: keyof Settings;
  settings: Settings;
  updateSettings: (settings: Settings) => void;
}

export function SettingsToggleSection({
  title,
  leftLabel,
  rightLabel,
  toggleID,
  settingsName,
  settings,
  updateSettings,
}: Props) {
  return (
    <>
      {/* Section title */}
      <h4 className="font-semibold text-base">{title}</h4>
      <div className="flex font-light text-sm justify-between">
        <span>
          <span>
            {/* Left label */}
            {!settings[settingsName] ? (
              <span className="text-selected p-0 hover:cursor-pointer">
                {leftLabel}
              </span>
            ) : (
              <span
                className="p-0 hover:cursor-pointer"
                onClick={() => {
                  // Update settings when left label is clicked
                  updateSettings({
                    ...settings,
                    [settingsName]: false,
                  });
                  let checkbox = document.getElementById(
                    toggleID,
                  ) as HTMLInputElement;
                  checkbox.checked = false;
                }}
              >
                {leftLabel}
              </span>
            )}
          </span>
          <span> | </span>
          <span>
            {/* Right label */}
            {settings[settingsName] ? (
              <span className="text-selected p-0 hover:cursor-pointer">
                {rightLabel}
              </span>
            ) : (
              <span
                className="p-0 hover:cursor-pointer"
                onClick={() => {
                  // Update settings when right label is clicked
                  updateSettings({
                    ...settings,
                    [settingsName]: true,
                  });
                  let checkbox = document.getElementById(
                    toggleID,
                  ) as HTMLInputElement;
                  checkbox.checked = true;
                }}
              >
                {rightLabel}
              </span>
            )}
          </span>
        </span>
        <label className="relative inline w-9">
          <input
            onClick={() =>
              // Update settings when checkbox is clicked
              updateSettings({
                ...settings,
                [settingsName]: !settings[settingsName],
              })
            }
            type="checkbox"
            checked={settings[settingsName] as boolean}
            id={toggleID}
            className="peer invisible"
            onChange={() => {}}
          />
          <span
            className="absolute top-0 left-0 w-9 h-5 cursor-pointer rounded-full
              bg-toggle-uncheck border-none transition-all duration-75
              hover:bg-toggle-hover peer-checked:bg-toggle-check"
          ></span>
          <span
            className="absolute top-0.5 left-0.5 w-4 h-4 bg-toggle-circle
              rounded-full transition-all duration-75 cursor-pointer
              peer-checked:translate-x-4"
          ></span>
        </label>
      </div>
    </>
  );
}