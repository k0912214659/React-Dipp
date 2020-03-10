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
  getWeatherCityList,
  getWeatherCitySettingList,
  postWeatherCitySetting,
  deleteWeatherCitySetting,
} from '@Reducers/weather/actions';
import WeatherCityPickList from './SubComponent/WeatherCityPickList';
import WeatherViewList from './SubComponent/WeatherViewList';
import Styles from './index.module.css';

function Weather() {
  /* Global & Local States */
  const dispatch = useDispatch();
  const storeWeather = useMappedState((state) => state.weather);
  const [requestCounter, setRequestCounter] = useState(0);
  const [requestQuery, setRequestQuery] = useState({ page: 1, query: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstUpdate, setIsFirstUpdate] = useState(false);
  /* Functions */
  const requestGetWeatherCityList = (page = 1, query = '') => {
    dispatch(getWeatherCityList(page, query));
    setIsLoading(true);
  };
  const requestGetWeatherCitySettingList = () => {
    dispatch(getWeatherCitySettingList());
    setIsLoading(true);
  };
  const requestPostWeatherCitySetting = (cityCode) => {
    dispatch(postWeatherCitySetting(cityCode));
    setIsLoading(true);
  };
  const requestDeleteWeatherCitySetting = (cityCode) => {
    dispatch(deleteWeatherCitySetting(cityCode));
    setIsLoading(true);
  };
  const onPageChange = (event, page) => {
    const newRequestQuery = cloneDeep(requestQuery);
    event.preventDefault();
    const newPage = page + 1;
    newRequestQuery.page = newPage;
    setRequestQuery(newRequestQuery);
  };
  const onQueryChange = (query) => {
    const newRequestQuery = cloneDeep(requestQuery);
    newRequestQuery.query = query;
    setRequestQuery(newRequestQuery);
  };
  const onSelectCity = (city) => {
    const selectedIndex = storeWeather.weatherCitySettingList.list.findIndex((weatherCity) => weatherCity.id === city.id);
    if (selectedIndex > -1) {
      requestDeleteWeatherCitySetting(city.id);
    } else {
      requestPostWeatherCitySetting(city);
    }
    setRequestCounter(1);
  };
  const onRemoveCity = (cityId) => {
    requestDeleteWeatherCitySetting(cityId);
    setRequestCounter(1);
  };
  const initialize = () => {
    setIsFirstUpdate(true);
    requestGetWeatherCityList();
    requestGetWeatherCitySettingList();
    setRequestCounter(2);
  };
  /* Views */
  const RenderWeatherPickList = useMemo(() => (
    <WeatherCityPickList
      weatherCityList={storeWeather.weatherCityList}
      weatherCitySettingList={storeWeather.weatherCitySettingList}
      onPageChange={onPageChange}
      onQueryChange={onQueryChange}
      onSelectCity={onSelectCity}
    />
  ), [storeWeather.weatherCityList, storeWeather.weatherCitySettingList]);
  const RenderWeatherViewList = useMemo(() => (
    <WeatherViewList
      weatherCityDataList={storeWeather.weatherCityDataList}
      requestCounter={requestCounter}
      onRemoveCity={onRemoveCity}
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
    if (!storeWeather.weatherCityList.error) {
      setRequestCounter(cloneDeep(requestCounter) - 1);
    }
    if (storeWeather.weatherCityList.error) {
      setRequestCounter(cloneDeep(requestCounter) - 1);
    }
  }, [storeWeather.weatherCityList]);
  useEffect(() => {
    if (!isFirstUpdate) return;
    if (!storeWeather.weatherCityDataList.error) {
      setRequestCounter(cloneDeep(requestCounter) - 1);
    }
    if (storeWeather.weatherCityDataList.error) {
      setRequestCounter(cloneDeep(requestCounter) - 1);
    }
  }, [storeWeather.weatherCityDataList]);
  useEffect(() => {
    if (!isFirstUpdate) return;
    requestGetWeatherCityList(requestQuery.page, requestQuery.query);
    setRequestCounter(1);
  }, [requestQuery]);
  useEffect(() => {
    if (!isFirstUpdate) return;
    if (requestCounter === 0) {
      setIsLoading(false);
    }
  }, [requestCounter]);
  /* Main */
  return (
    <div className={classNames(Styles.weatherContainer)}>
      <Grid
        className={classNames(Styles.weatherMainContainer)}
        container
        spacing={2}
        direction="row"
        justify="center"
      >
        <Grid
          className={classNames(Styles.weatherInnerContainer)}
          item
          xs={11}
          sm={11}
          md={7}
        >
          {RenderWeatherViewList}
        </Grid>
        <Grid
          className={classNames(Styles.weatherInnerContainer)}
          item
          xs={11}
          sm={11}
          md={3}
        >
          {RenderWeatherPickList}
        </Grid>
      </Grid>
      {RenderLoading}
    </div>
  );
}

export default memo(Weather);
