import React, { memo } from 'react';
import classNames from 'classnames';
import Styles from './index.module.css';

function Weather() {
  /* Global & Local States */
  /* Functions */
  /* Views */
  /* Main */
  return (
    <div className={classNames(Styles.weatherContainer)}>
      Weather
    </div>
  );
}

export default memo(Weather);
