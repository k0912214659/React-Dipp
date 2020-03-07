import { WEATHER_ACTION } from '@Reducers/createConstants';
import { errorCatch } from '@Reducers/errorCapture';

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
export const getWeatherCityList = (page = 1, query = '', max = 10) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.serviceAPI;
  const result = await apiObject.getServiceByType('WeatherAPI').getHostWeatherCityList(page, query, max);
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
    dispatch(errorCatch(result.error));
  }
};

export const getWeatherCitySettingList = () => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.serviceAPI;
  const result = await apiObject.getServiceByType('WeatherAPI').getHostWeatherCitySettingList();
  const resultCityData = await apiObject.getServiceByType('WeatherAPI').getHostWeatherData(result.map((city) => city.id));
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
    dispatch(errorCatch(result.error));
  }
  if (!resultCityData.error) {
    dispatch(SET_WEATHER_CITY_DATA_LIST({
      list: resultCityData,
    }));
  }
  if (resultCityData.error) {
    dispatch(errorCatch(result.error));
  }
};

export const postWeatherCitySetting = (city) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.serviceAPI;
  const result = await apiObject.getServiceByType('WeatherAPI').postHostWeatherCity(city);
  if (!result.error) {
    dispatch(getWeatherCitySettingList());
  }
  if (result.error) {
    dispatch(getWeatherCityList());
    dispatch(errorCatch(result.error));
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
    dispatch(errorCatch(result.error));
  }
};
