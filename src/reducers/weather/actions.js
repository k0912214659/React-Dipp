import { WEATHER_ACTION } from '@Reducers/createConstants';

/* Weather */
export const SET_WEATHER_CITY_LIST = ({ list }) => ({
  type: WEATHER_ACTION.SET_WEATHER_CITY_LIST,
  list,
});
export const SET_WEATHER_CITY_SETTING_LIST = ({ list }) => ({
  type: WEATHER_ACTION.SET_WEATHER_CITY_SETTING_LIST,
  list,
});
export const SET_WEATHER_CITY_DATA_LIST = ({ list }) => ({
  type: WEATHER_ACTION.SET_WEATHER_CITY_DATA_LIST,
  list,
});

/* Weather Action */
export const getWeatherCityList = (page = 1, max = 10) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.serviceAPI;
  const result = await apiObject.getServiceByType('WeatherAPI').getHostWeatherCityList(page, max);
  if (!result.error) {
    dispatch(SET_WEATHER_CITY_LIST({
      list: {
        list: result.list,
        page: result.page,
      },
    }));
  }
  if (result.error) {
    dispatch(SET_WEATHER_CITY_LIST({
      list: {
        list: result.list,
        page: result.page,
        error: result.error,
      },
    }));
  }
};

export const getWeatherCitySettingList = () => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.serviceAPI;
  const result = await apiObject.getServiceByType('WeatherAPI').getHostWeatherCitySettingList();
  if (!result.error) {
    dispatch(SET_WEATHER_CITY_SETTING_LIST({
      list: {
        list: result,
      },
    }));
  }
  if (result.error) {
    dispatch(SET_WEATHER_CITY_SETTING_LIST({
      list: {
        list: result,
        error: result.error,
      },
    }));
  }
};

export const postWeatherCitySetting = (cityCode) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.serviceAPI;
  const result = await apiObject.getServiceByType('WeatherAPI').postHostWeatherCity(cityCode);
  if (!result.error) {
    dispatch(getWeatherCitySettingList());
  }
  if (result.error) {
    dispatch(getWeatherCityList());
  }
};

export const deleteWeatherCitySetting = (cityCode) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.serviceAPI;
  const result = await apiObject.getServiceByType('WeatherAPI').deleteHostWeatherCity(cityCode);
  if (!result.error) {
    dispatch(getWeatherCitySettingList());
  }
  if (result.error) {
    dispatch(getWeatherCitySettingList());
  }
};

export const getWeatherCityData = (cityCode) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.serviceAPI;
  const result = await apiObject.getServiceByType('WeatherAPI').getHostWeatherData(cityCode);
  if (!result.error) {
    dispatch(SET_WEATHER_CITY_DATA_LIST({
      list: [...getState().weather.weatherCityDataList].concat(result),
    }));
  }
  if (result.error) {
    dispatch(SET_WEATHER_CITY_DATA_LIST({
      list: [...getState().weather.weatherCityDataList],
    }));
  }
};
