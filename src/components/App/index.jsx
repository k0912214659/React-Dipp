import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import useMappedState from '@Hooks/useMappedState';
import Header from '@Components/Header';
import LazyComponent from '@Components/Base/Lazy';
import ModalDialog from '@Components/Modals/ModalDialog';
import ModalConfirm from '@Components/Modals/ModalConfirm';
import Styles from './index.module.css';

function App({ Router, routerProps }) {
  /* Global & Local States */
  const storeUser = useMappedState((state) => state.user);
  const storeMessage = useMappedState((state) => state.message);
  /* Views */
  const RenderRoute = useMemo(() => {
    switch (storeUser.userIdentity.identity) {
      case 1:
        return (
          <div className={classNames(Styles.appContainer)}>
            <div className={classNames(Styles.appHeader)}>
              <Header />
            </div>
            <div className={classNames(Styles.appBody)}>
              <div className={classNames(Styles.appHeart)}>
                <div className={classNames(Styles.appMain)}>
                  <LazyComponent componentImport={import('./RouteComponent/AdminRoute')} componentChunkName="AdminRouteChunk" />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={classNames(Styles.appContainer)}>
            <div className={classNames(Styles.appHeader)}>
              <Header />
            </div>
            <div className={classNames(Styles.appBody)}>
              <div className={classNames(Styles.appHeart)}>
                <div className={classNames(Styles.appMain)}>
                  <LazyComponent componentImport={import('./RouteComponent/ClientRoute')} componentChunkName="ClientRouteChunk" />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
      default:
        return (<LazyComponent componentImport={import('./RouteComponent/GuestRoute')} componentChunkName="GuestRouteChunk" />);
    }
  }, [storeUser.userIdentity]);
  const RenderConfirm = useMemo(() => (
    <ModalConfirm />
  ), [storeMessage]);
  const RenderDialog = useMemo(() => (
    <ModalDialog />
  ), [storeMessage]);
  /* Main */
  return (
    <Router {...routerProps}>
      {RenderRoute}
      {RenderDialog}
      {RenderConfirm}
    </Router>
  );
}

export default memo(App);
