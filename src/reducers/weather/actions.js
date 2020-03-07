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
  const apiServiceObject = getState().global.globalAPIS.serviceAPI;
  const apiObject = getState().global.globalAPIS.hostAPI;
  const result = await apiObject.weatherPreset.getHostWeatherCitySettingList();
  const resultArray = Object.entries(result).map((ele) => ({
    firebaseID: ele[0],
    ...ele[1],
  }));
  const resultCityData = await apiServiceObject.getServiceByType('WeatherAPI').getHostWeatherData(Object.values(result).map((city) => city.id));
  const resultCityNewArray = resultCityData.map((city, index) => ({ ...city, firebaseID: resultArray[index].firebaseID }));
  if (!resultCityData.error) {
    dispatch(SET_WEATHER_CITY_DATA_LIST({
      list: resultCityNewArray,
    }));
  }
  if (resultCityData.error) {
    dispatch(SET_WEATHER_CITY_DATA_LIST({
      list: getState().weather.weatherCityDataList,
    }));
    dispatch(errorCatch(resultCityData.error));
  }
  if (!result.error) {
    dispatch(SET_WEATHER_CITY_SETTING_LIST({
      list: {
        list: resultArray,
      },
    }));
  }
  if (result.error) {
    dispatch(SET_WEATHER_CITY_SETTING_LIST({
      list: {
        list: resultArray,
        error: result.error,
      },
    }));
    dispatch(errorCatch(result.error));
  }
};

export const postWeatherCitySetting = (city) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.hostAPI;
  const result = await apiObject.weatherPreset.postHostWeatherCity(city);
  if (!result.error) {
    dispatch(getWeatherCitySettingList());
  }
  if (result.error) {
    dispatch(getWeatherCityList());
    dispatch(errorCatch(result.error));
  }
};

export const deleteWeatherCitySetting = (cityID) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.hostAPI;
  const weatherCitySettingList = getState().weather.weatherCityDataList;
  const targetCityIndex = weatherCitySettingList.findIndex((cityObject) => cityObject.city.id === cityID);
  const result = await apiObject.weatherPreset.deleteHostWeatherCity(weatherCitySettingList[targetCityIndex].firebaseID);
  if (!result.error) {
    dispatch(getWeatherCitySettingList());
  }
  if (result.error) {
    dispatch(getWeatherCitySettingList());
    dispatch(errorCatch(result.error));
  }
};
