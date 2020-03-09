import React, {
  memo,
  useState,
  useEffect,
  useMemo,
} from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import useDispatch from '@Hooks/useDispatch';
import useDidMount from '@Hooks/useDidMount';
import useMappedState from '@Hooks/useMappedState';
import {
  getADObject,
  postADObjectSelect,
} from '@Reducers/ad/actions';
import Loading from '@Components/Base/Loading';
import ADCanvas from './SubComponent/ADCanvas';
import ADList from './SubComponent/ADList';
import Styles from './index.module.css';

function ADViewer() {
  /* Global & Local States */
  const dispatch = useDispatch();
  const storeAD = useMappedState((state) => state.ad);
  const [requestCounter, setRequestCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstUpdate, setIsFirstUpdate] = useState(false);
  /* Functions */
  const requestGetADObject = () => {
    dispatch(getADObject());
  };
  const requestPostADObjectSelect = (index) => {
    dispatch(postADObjectSelect(index));
  };
  const onSelectAD = (index) => {
    if (storeAD.adContent.selectIndex === index) index = -1;
    requestPostADObjectSelect(index);
  };
  const initialize = () => {
    setIsFirstUpdate(true);
    requestGetADObject();
    setRequestCounter(1);
  };
  /* Views */
  const RenderLoading = useMemo(() => (
    <Loading
      typePosition="absolute"
      typeZIndex={10003}
      typeIcon="line:relative"
      isLoading={isLoading}
    />
  ), [isLoading]);
  /* Hooks */
  useDidMount(() => {
    initialize();
  });
  useEffect(() => {
    if (!isFirstUpdate) return;
    if (!storeAD.adContent.error) {
      setRequestCounter(requestCounter - 1);
    }
    if (storeAD.adContent.error) {
      setRequestCounter(requestCounter - 1);
    }
  }, [storeAD.adContent]);
  useEffect(() => {
    if (!isFirstUpdate) return;
    if (requestCounter === 0) {
      setIsLoading(false);
    }
  }, [requestCounter]);
  /* Main */
  return (
    <div className={classNames(Styles.adViewerContainer)}>
      <Grid
        className={classNames(Styles.adViewerMainContainer)}
        container
        spacing={2}
        direction="row"
        justify="center"
      >
        <Grid
          className={classNames(Styles.adViewerInnerContainer)}
          item
          xs={11}
          sm={3}
          md={3}
        >
          <ADList
            adContent={storeAD.adContent}
            onSelectAD={onSelectAD}
          />
        </Grid>
        <Grid
          className={classNames(Styles.adViewerInnerContainer)}
          item
          xs={11}
          sm={9}
          md={9}
        >
          <ADCanvas adContent={storeAD.adContent} />
        </Grid>
      </Grid>
      {RenderLoading}
    </div>
  );
}

export default memo(ADViewer);
