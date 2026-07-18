import { useEffect, useRef } from 'react';

export default function useMagnetic(strength = 0.35, radius = 80) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;

      // Distance from mouse to center of element
      const distanceX = e.clientX - elCenterX;
      const distanceY = e.clientY - elCenterY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < radius) {
        // Pull element towards mouse
        const x = distanceX * strength;
        const y = distanceY * strength;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        el.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)';
      } else {
        // Reset element position
        el.style.transform = 'translate3d(0, 0, 0)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      }
    };

    const onMouseLeave = () => {
      el.style.transform = 'translate3d(0, 0, 0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    };

    window.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength, radius]);

  return ref;
}
