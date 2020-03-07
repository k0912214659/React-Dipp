import React, { memo } from 'react';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import useMappedState from '@Hooks/useMappedState';
import Image from '@Components/Base/Image';
import { loadImage } from '@Tools/image-loader';
import Styles from './index.module.css';

function Header(headerProps) {
  /* Global & Local States */
  const { signOut } = headerProps;
  const storeUser = useMappedState((state) => state.user);
  /* Functions */
  const onGotoPage = (url, type) => {
    if (!type) {
      window.open(url, '_blank');
    } else {
      window.open(url, type);
    }
  };
  const onSignOut = () => {
    signOut();
  };
  /* Main */
  return (
    <AppBar className={classNames(Styles.headerAppStyle)} position="static">
      <div className={classNames(Styles.headerLogoContainer)}>
        <div
          className={classNames(Styles.headerLogoIconContainer)}
          role="button"
          tabIndex={-1}
          onClick={() => onGotoPage('/todo', '_self')}
          onKeyDown={() => {}}
        >
          <Image
            className={classNames(Styles.headerImageStyle)}
            src={loadImage('general/logo.png')}
            alt="classroom-home"
            typeSize="fit"
          />
        </div>
        <div className={classNames(Styles.headerLogoTextContainer)}>
          React Dipp Weather
        </div>
      </div>
      <div className={classNames(Styles.headerLogoProfileContainer)}>
        <div
          className={classNames(Styles.headerLogoProfileIconContainer)}
          role="button"
          tabIndex={-1}
          onClick={() => onGotoPage('https://github.com/k0912214659')}
          onKeyDown={() => {}}
        >
          <GitHubIcon />
        </div>
        <div className={classNames(Styles.headerLogoProfileTextContainer)}>
          {storeUser.userInformation.name}
        </div>
        <Button
          className={classNames(Styles.headerLogoProfileButtonStyle)}
          onClick={onSignOut}
        >
          Sign Out
        </Button>
      </div>
    </AppBar>
  );
}

export default memo(Header);
