import React, { memo } from 'react';
import { useTrail, animated } from 'react-spring';

const DefAnimation = {
  from: { marginTop: -50 },
  to: { marginTop: 0 },
};

function Trail(props) {
  /* Global & Local State */
  const {
    typeLength,
    typeStandardStyle,
    typeAnimationStyle,
    children,
  } = props;
  /* Animations */
  const trail = typeAnimationStyle ? useTrail(typeLength, typeAnimationStyle) : useTrail(typeLength, DefAnimation);
  return (
    <div>
      {
        trail.map((animationProps, index) => (
          <animated.div style={{ ...animationProps, ...typeStandardStyle }} key={index}>
            {children}
          </animated.div>
        ))
      }
    </div>
  );
}

export default memo(Trail);
