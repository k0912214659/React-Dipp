import React, {
  memo,
  useState,
  useEffect,
  useMemo,
} from 'react';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import classNames from 'classnames';
import useDidMount from '@Hooks/useDidMount';
import useMappedState from '@Hooks/useMappedState';
import Header from '@Components/Header';
import LazyComponent from '@Components/Base/Lazy';
import ModalDialog from '@Components/Modals/ModalDialog';
import ModalConfirm from '@Components/Modals/ModalConfirm';
import Styles from './index.module.css';

function App({ Router, routerProps }) {
  /* Global & Local States */
  const storeGlobal = useMappedState((state) => state.global);
  const storeMessage = useMappedState((state) => state.message);
  const [isFirstUpdate, setIsFirstUpdate] = useState(false);
  /* Functions */
  const initialize = () => {
    setIsFirstUpdate(true);
  };
  /* Views */
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
    /* eslint-disable-next-line no-console */
    console.log(storeGlobal);
  }, [storeGlobal]);
  return (
    <Router {...routerProps}>
      <div className={classNames(Styles.appContainer)}>
        <div className={classNames(Styles.appHeader)}>
          <Header />
        </div>
        <div className={classNames(Styles.appBody)}>
          <div className={classNames(Styles.appHeart)}>
            <div className={classNames(Styles.appMain)}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/weather" />}
                />
                <Route
                  path="/weather"
                  render={() => <LazyComponent componentImport={import('@Components/Weather')} componentChunkName="WeatherChunk" />}
                />
                <Route
                  path="/adviewer"
                  render={() => <LazyComponent componentImport={import('@Components/ADViewer')} componentChunkName="ADViewerChunk" />}
                />
                <Redirect to="/weather" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
      {RenderDialog}
      {RenderConfirm}
    </Router>
  );
}

export default memo(App);
