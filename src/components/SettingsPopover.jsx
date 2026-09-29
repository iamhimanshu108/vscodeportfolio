import { Type, Palette, X } from "lucide-react";

export function SettingsPopover({ theme, font, textColor, onThemeChange, onFontChange, onTextColorChange, onClose }) {
  return (
    <aside className="settings-popover" aria-label="Settings">
      <div className="settings-heading">
        <span>SETTINGS</span>
        <button className="icon-button" onClick={onClose} aria-label="Close settings"><X size={15} /></button>
      </div>
      <label><Palette size={15} /> Theme
        <select value={theme} onChange={(event) => onThemeChange(event.target.value)}>
          <option value="midnight">Midnight</option>
          <option value="ocean">Ocean</option>
          <option value="light">Light</option>
        </select>
      </label>
      <label><Type size={15} /> Font
        <select value={font} onChange={(event) => onFontChange(event.target.value)}>
          <option value="mono">Monospace</option>
          <option value="system">System</option>
          <option value="serif">Serif</option>
        </select>
      </label>
      <label><Type size={15} /> Text color
        <select value={textColor} onChange={(event) => onTextColorChange(event.target.value)}>
          <option value="default">VS Code default</option>
          <option value="blue">Syntax blue</option>
          <option value="green">Terminal green</option>
          <option value="purple">Syntax purple</option>
        </select>
      </label>
    </aside>
  );
}
