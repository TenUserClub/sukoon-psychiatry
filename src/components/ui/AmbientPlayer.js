'use client';

import { useState, useRef, useEffect } from 'react';
import SVGIcon from '@/components/ui/SVGIcon';

/**
 * AmbientPlayer - opt-in ambient sound player.
 * Plays a soothing, real audio track (ocean waves) instead of synthetic noise
 * for a much better user experience.
 */
export default function AmbientPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio object once
  useEffect(() => {
    // Using a reliable, widely supported soothing MP3 track
    const audio = new Audio('https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3');
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      setPlaying(true);
    }
  };

  // Update volume in real-time
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div
      className="ambient-player"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <button
        className={`ambient-btn ${playing ? 'playing' : 'animate-pulse-soft'}`}
        onClick={toggle}
        aria-label={playing ? 'Stop ambient sound' : 'Play ambient sound'}
        title={playing ? 'Stop ambient sound' : 'Play soothing ambient sound'}
      >
        <SVGIcon name={playing ? 'volume-on' : 'music-note'} size={20} />
      </button>

      {showControls && (
        <div className="ambient-controls-popup bottom-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: playing ? '0.75rem' : '0' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {playing ? 'Ocean Waves' : 'Play Ambient'}
            </span>
            <SVGIcon name={playing ? "volume-on" : "music-note"} size={14} style={{ color: 'var(--primary)' }} />
          </div>
          {playing && (
            <div className="volume-slider-container">
              <input
                type="range"
                className="ambient-volume"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{ backgroundSize: `${volume * 100}% 100%` }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
