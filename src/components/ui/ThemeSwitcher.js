'use client';

import { useContext, useState } from 'react';
import { ThemeContext } from '@/components/ThemeProvider';
import { THEMES } from '@/lib/themes';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const currentTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <div className="theme-switcher">
      <button
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme picker"
        title="Switch theme"
      >
        {currentTheme.emoji}
      </button>

      {isOpen && (
        <div className="theme-panel">
          <h5>Choose Theme</h5>
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`theme-option ${theme === t.id ? 'active' : ''}`}
              onClick={() => { setTheme(t.id); setIsOpen(false); }}
            >
              <span className="theme-swatch" style={{ background: t.color }} />
              <span className="theme-option-name">
                {t.emoji} {t.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
