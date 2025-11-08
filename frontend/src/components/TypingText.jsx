import React, { useEffect, useState, useRef } from 'react';

/**
 * TypingText
 * Props:
 * - text: string to type
 * - speed: ms per character (default 60)
 * - pause: ms to wait after finishing before restarting (default 1500)
 * - loop: whether to repeat the typing animation (default true)
 */
export default function TypingText({ text = '', speed = 30, pause = 3000, loop = true, className = '' }) {
  const [visible, setVisible] = useState('');
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    let charInterval = null;
    let restartTimeout = null;

    const start = () => {
      if (!mounted.current) return;
      setVisible('');
      let i = 0;
      charInterval = setInterval(() => {
        i += 1;
        setVisible(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(charInterval);
          if (loop) restartTimeout = setTimeout(start, pause);
        }
      }, speed);
    };

    start();

    return () => {
      mounted.current = false;
      if (charInterval) clearInterval(charInterval);
      if (restartTimeout) clearTimeout(restartTimeout);
    };
  }, [text, speed, pause, loop]);

  return (
    <span className={`typing-text ${className}`} aria-live="polite">
      {visible}
      <span className="typing-cursor" />
    </span>
  );
}
