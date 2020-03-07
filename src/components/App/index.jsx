import React, {
  memo,
  useState,
  useMemo,
  useEffect,
} from 'react';
import classNames from 'classnames';
import useDidMount from '@Hooks/useDidMount';
import useDispatch from '@Hooks/useDispatch';
import useMappedState from '@Hooks/useMappedState';
import {
  getUserSession,
  deleteUserSession,
} from '@Reducers/user/actions';
import Header from '@Components/Header';
import Loading from '@Components/Base/Loading';
import LazyComponent from '@Components/Base/Lazy';
import ModalDialog from '@Components/Modals/ModalDialog';
import ModalConfirm from '@Components/Modals/ModalConfirm';
import Styles from './index.module.css';

function App({ Router, routerProps }) {
  /* Global & Local States */
  const dispatch = useDispatch();
  const storeUser = useMappedState((state) => state.user);
  const storeMessage = useMappedState((state) => state.message);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckDown, setIsCheckDown] = useState(false);
  const [isFirstUpdate, setIsFirstUpdate] = useState(false);
  /* Functions */
  const requestGetUserInformation = () => {
    dispatch(getUserSession());
    setIsLoading(true);
  };
  const requestDeleteUserInformation = () => {
    dispatch(deleteUserSession());
    setIsLoading(true);
  };
  const initialize = () => {
    requestGetUserInformation();
    setIsFirstUpdate(true);
  };
  /* Views */
  const RenderRoute = useMemo(() => {
    if (isCheckDown) {
      switch (storeUser.userIdentity.identity) {
        case 1:
          return (
            <div className={classNames(Styles.appContainer)}>
              <div className={classNames(Styles.appHeader)}>
                <Header signOut={requestDeleteUserInformation} />
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
                <Header signOut={requestDeleteUserInformation} />
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
    }
    return (<LazyComponent componentImport={import('./RouteComponent/GuestRoute')} componentChunkName="GuestRouteChunk" />);
  }, [storeUser.userIdentity, isCheckDown]);
  const RenderLoading = useMemo(() => (
    <Loading
      typePosition="relative"
      typeZIndex={10003}
      typeIcon="line:relative"
      isLoading={isLoading}
    />
  ), [isLoading]);
  const RenderConfirm = useMemo(() => (
    <ModalConfirm />
  ), [storeMessage]);
  const RenderDialog = useMemo(() => (
    <ModalDialog />
  ), [storeMessage]);
  /* Hooks */
  useDidMount(() => {
    initialize();
  });
  useEffect(() => {
    if (!isFirstUpdate) return;
    setIsCheckDown(true);
    setIsLoading(false);
  }, [storeUser.userIdentity]);
  /* Main */
  return (
    <Router {...routerProps}>
      {RenderRoute}
      {RenderDialog}
      {RenderConfirm}
      {RenderLoading}
    </Router>
  );
}

export default memo(App);
