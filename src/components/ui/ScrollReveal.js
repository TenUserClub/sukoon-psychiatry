'use client';

import useScrollReveal from '@/hooks/useScrollReveal';

const transforms = {
  up: 'translateY(40px)',
  down: 'translateY(-40px)',
  left: 'translateX(-40px)',
  right: 'translateX(40px)',
  fade: 'none',
};

/**
 * ScrollReveal - wraps children in a scroll-triggered animation container.
 * Usage: <ScrollReveal direction="up" delay={0.2}>...</ScrollReveal>
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  style = {},
  ...rest
}) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : transforms[direction] || transforms.up,
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'opacity, transform',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
