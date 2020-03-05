import cloneDeep from 'lodash/cloneDeep';
import Immerable from '@Models/GeneralImmer';

class Weather extends Immerable {
  constructor() {
    super();
    this.weatherCityList = {
      list: [],
      page: {
        cur: 1,
        total: 1,
      },
    };
    this.weatherCitySettingList = {
      list: [],
    };
    this.weatherCityDataList = [];
  }

  updateWeatherCityList(newWeatherCityList) {
    const newCloneWeatherCityList = cloneDeep(newWeatherCityList);
    this.weatherCityList = newCloneWeatherCityList;
  }

  updateWeatherCitySettingList(newWeatherCitySettingList) {
    const newCloneWeatherCitySettingList = cloneDeep(newWeatherCitySettingList);
    this.weatherCitySettingList = newCloneWeatherCitySettingList;
  }

  updateWeatherCityData(newWeatherCityData) {
    const newCloneWeatherCityLData = cloneDeep(newWeatherCityData);
    this.weatherCityDataList = newCloneWeatherCityLData;
  }
}

export default Weather;
