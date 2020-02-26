import React, { memo } from 'react';
import { useTransition, animated } from 'react-spring';

const DefAnimation = {
  from: { opacity: 0, zIndex: 9999 },
  enter: { opacity: 1, zIndex: 10000 },
  leave: { opacity: 0, zIndex: 9999 },
};

function Fade(fadeProps) {
  /* Global & Local State */
  const {
    typeAnimation,
    typeStandardStyle,
    typeAnimationStyle,
    children,
  } = fadeProps;
  /* Animations */
  const fade = typeAnimationStyle ? useTransition(typeAnimation, null, typeAnimationStyle) : useTransition(typeAnimation, null, DefAnimation);
  return (
    <div>
      {
        fade.map(({ item, key, props }) => item && (
          <animated.div key={key} style={{ ...props, ...typeStandardStyle }}>
            {children}
          </animated.div>
        ))
      }
    </div>
  );
}

export default memo(Fade);
