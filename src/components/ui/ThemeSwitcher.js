'use client';

import { useState, useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '@/components/ThemeProvider';
import { THEMES } from '@/lib/themes';
import SVGIcon from '@/components/ui/SVGIcon';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const currentTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  const handleSelect = (id) => {
    setTheme(id);
    setShowDropdown(false);
  };

  return (
    <div className="theme-switcher-fixed" ref={dropdownRef}>
      <button
        className="ambient-btn"
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="Switch theme"
        title="Switch theme"
      >
        <span
          style={{
            display: 'block',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: currentTheme.color,
          }}
        />
      </button>

      {showDropdown && (
        <div className="theme-dropdown bottom-up">
          <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Choose Theme</h5>
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`theme-option ${theme === t.id ? 'active' : ''}`}
              onClick={() => handleSelect(t.id)}
            >
              <span
                className="theme-swatch"
                style={{ background: t.color }}
              />
              <span className="theme-option-name">{t.emoji} {t.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
