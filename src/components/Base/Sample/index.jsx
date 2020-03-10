import React, { memo } from 'react';
import classNames from 'classnames';
import Styles from './index.module.css';

function Sample() {
  /* Global & Local States */
  /* Functions */
  /* Views */
  /* Main */
  return (
    <div className={classNames(Styles.sampleContainer)}>
      Sample
    </div>
  );
}

export default memo(Sample);
