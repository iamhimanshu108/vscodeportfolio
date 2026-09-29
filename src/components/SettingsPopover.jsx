import { useState } from "react";
import { Type, Palette, X, Hash, PanelRight, WrapText } from "lucide-react";

export function SettingsPopover({ theme, font, textColor, onThemeChange, onFontChange, onTextColorChange, onClose }) {
  const [lineNumbers, setLineNumbers] = useState(true);
  const [minimap, setMinimap] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);
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
      <label><Hash size={15} /> Line numbers
        <select value={lineNumbers ? "on" : "off"} onChange={(e) => setLineNumbers(e.target.value === "on")}><option value="on">On</option><option value="off">Off</option></select>
      </label>
      <label><PanelRight size={15} /> Minimap
        <select value={minimap ? "on" : "off"} onChange={(e) => setMinimap(e.target.value === "on")}><option value="on">On</option><option value="off">Off</option></select>
      </label>
      <label><WrapText size={15} /> Word wrap
        <select value={wordWrap ? "on" : "off"} onChange={(e) => setWordWrap(e.target.value === "on")}><option value="on">On</option><option value="off">Off</option></select>
      </label>
      <label><Type size={15} /> Tab size
        <select defaultValue="2"><option value="2">2 spaces</option><option value="4">4 spaces</option><option value="8">8 spaces</option></select>
      </label>
    </aside>
  );
}
