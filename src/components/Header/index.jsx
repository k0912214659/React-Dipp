import React, { memo } from 'react';
import classNames from 'classnames';
import Image from '@Components/Base/Image';
import { loadImage } from '@Tools/image-loader';
import Styles from './index.module.css';

function Header() {
  /* Global & Local States */
  /* Main */
  return (
    <div className={classNames(Styles.headerContainer)}>
      <div className={classNames(Styles.headerImage, Styles.flexCentral)}>
        <div className={classNames(Styles.headerImageTemplate)}>
          <Image
            className={classNames(Styles.headerImageStyle)}
            src={loadImage('general/logo.png')}
            alt="classroom-home"
            typeSize="fit"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
