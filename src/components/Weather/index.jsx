import React, {
  memo,
  useState,
  useEffect,
  useMemo,
} from 'react';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TablePagination from '@material-ui/core/TablePagination';
import useDispatch from '@Hooks/useDispatch';
import useDidMount from '@Hooks/useDidMount';
import useMappedState from '@Hooks/useMappedState';
import Loading from '@Components/Base/Loading';
import {
  getWeatherCityList,
  getWeatherCitySettingList,
  postWeatherCitySetting,
  deleteWeatherCitySetting,
  getWeatherCityData,
} from '@Reducers/weather/actions';
import Styles from './index.module.css';

function Weather() {
  /* Global & Local States */
  const dispatch = useDispatch();
  const storeWeather = useMappedState((state) => state.weather);
  const [requestCounter, setRequestCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstUpdate, setIsFirstUpdate] = useState(false);
  /* Functions */
  const requestGetWeatherCityList = (page = 1) => {
    dispatch(getWeatherCityList(page));
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
    event.preventDefault();
    const newPage = page + 1;
    requestGetWeatherCityList(newPage);
    setRequestCounter(1);
  };
  const onCreateSettingCity = (cityCode) => {
    setRequestCounter(1);
    requestPostWeatherCitySetting(cityCode);
  };
  const onRemoveSettingCity = (cityCode) => {
    setRequestCounter(1);
    requestDeleteWeatherCitySetting(cityCode);
  };
  const initialize = () => {
    setIsFirstUpdate(true);
    requestGetWeatherCityList();
    requestGetWeatherCitySettingList();
    setRequestCounter(2);
    dispatch(getWeatherCityData(1668341));
  };
  /* Views */
  const RenderPage = ({ from, to, count }) => (`${from}-${to === -1 ? count : to} of ${count}`);
  const RenderCityList = useMemo(() => (
    <List>
      {
        storeWeather.weatherCityList.list.map((city, index) => (
          <ListItem alignItems="flex-start" key={index}>
            <ListItemIcon>
              <SpeakerNotesIcon />
            </ListItemIcon>
            <ListItemText
              primary={city.name}
              secondary={city.country}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="add"
                onClick={() => onCreateSettingCity(city)}
              >
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      }
    </List>
  ), [storeWeather.weatherCityList]);
  const RenderCityPager = useMemo(() => (
    <TablePagination
      component="div"
      rowsPerPageOptions={[]}
      count={storeWeather.weatherCityList.page.total * 10}
      rowsPerPage={10}
      labelRowsPerPage=""
      labelDisplayedRows={RenderPage}
      page={storeWeather.weatherCityList.page.cur - 1}
      onChangePage={onPageChange}
      onChangeRowsPerPage={() => {}}
    />
  ), [storeWeather.weatherCityList]);
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
          xs={10}
          sm={6}
          md={4}
        >
          <div>
            {
              storeWeather.weatherCitySettingList.list.map((city) => (
                <div key={city.id}>
                  {city.name}
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onRemoveSettingCity(city.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))
            }
          </div>
        </Grid>
        <Grid
          className={classNames(Styles.weatherInnerContainer)}
          item
          xs={10}
          sm={6}
          md={4}
        >
          <div className={classNames(Styles.weatherHeaderContainer)}>
            Weather Setting Title
          </div>
          <div className={classNames(Styles.weatherListContainer)}>
            {RenderCityList}
            {RenderCityPager}
          </div>
        </Grid>
        {RenderLoading}
      </Grid>
    </div>
  );
}

export default memo(Weather);
