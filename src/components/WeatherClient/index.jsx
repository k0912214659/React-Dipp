import React, {
  memo,
  useState,
  useEffect,
  useMemo,
} from 'react';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import Grid from '@material-ui/core/Grid';
import useDispatch from '@Hooks/useDispatch';
import useDidMount from '@Hooks/useDidMount';
import useMappedState from '@Hooks/useMappedState';
import Loading from '@Components/Base/Loading';
import {
  getWeatherCitySettingList,
} from '@Reducers/weather/actions';
import WeatherViewList from './SubComponent/WeatherViewList';
import Styles from './index.module.css';

function WeatherClient() {
  /* Global & Local States */
  const dispatch = useDispatch();
  const storeWeather = useMappedState((state) => state.weather);
  const [requestCounter, setRequestCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstUpdate, setIsFirstUpdate] = useState(false);
  /* Functions */
  const requestGetWeatherSettingCityList = (page = 1) => {
    dispatch(getWeatherCitySettingList(page));
    setIsLoading(true);
  };
  const initialize = () => {
    setIsFirstUpdate(true);
    requestGetWeatherSettingCityList();
    setRequestCounter(1);
  };
  /* Views */
  const RenderWeatherViewList = useMemo(() => (
    <WeatherViewList
      weatherCityDataList={storeWeather.weatherCityDataList}
      requestCounter={requestCounter}
    />
  ), [storeWeather.weatherCityDataList, requestCounter]);
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
    if (!storeWeather.weatherCitySettingList.error) {
      setRequestCounter(cloneDeep(requestCounter) - 1);
    }
    if (storeWeather.weatherCitySettingList.error) {
      setRequestCounter(cloneDeep(requestCounter) - 1);
    }
  }, [storeWeather.weatherCitySettingList]);
  useEffect(() => {
    if (!isFirstUpdate) return;
    if (requestCounter === 0) {
      setIsLoading(false);
    }
  }, [requestCounter]);
  /* Main */
  return (
    <div className={classNames(Styles.weatherClientContainer)}>
      <Grid
        className={classNames(Styles.weatherClientMainContainer)}
        container
        spacing={2}
        direction="row"
        justify="center"
      >
        <Grid
          className={classNames(Styles.weatherClientInnerContainer)}
          item
          xs={11}
          sm={11}
          md={7}
        >
          {RenderWeatherViewList}
        </Grid>
      </Grid>
      {RenderLoading}
    </div>
  );
}

export default memo(WeatherClient);
