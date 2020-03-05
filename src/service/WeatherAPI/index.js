import BaseAPIService from '@Service/BaseAPIService';
import CityJson from '@Source/City/city.json';
import { delay } from '@Tools/utility';

class WeatherAPI extends BaseAPIService {
  constructor() {
    super();
    this.setApiBaseServiceType('WeatherAPI');
    this.setApiBaseUrl('http://api.openweathermap.org');
    this.setApiKey('27e5ae017372abef45f4085ab89232d4');
    this.initializeLocalStorage();
  }

  async initializeLocalStorage() {
    const localStorageKey = 'react-dipp:settingData';
    const defaultSettingData = [];
    const localItemOrigin = localStorage.getItem(localStorageKey);
    if (!localItemOrigin) {
      localStorage.setItem(localStorageKey, JSON.stringify(defaultSettingData));
    }
    this.setApiExternalProps('weatherAPILocalStorage', localStorageKey);
  }

  async getHostWeatherCityList(page = 1, max = 10) {
    await delay(400);
    const groupsByMax = [];
    const cityListObject = {
      list: [],
      page: {
        cur: 1,
        total: 1,
      },
    };
    try {
      for (let i = 0, len = CityJson.length; i < len; i += max) {
        groupsByMax.push(CityJson.slice(i, i + max));
      }
      if (groupsByMax.length === 1) {
        cityListObject.list = groupsByMax[0];
        cityListObject.page = {
          cur: 1,
          total: groupsByMax.length,
        };
      } else if (groupsByMax.length > 1) {
        cityListObject.list = groupsByMax[page - 1];
        cityListObject.page = {
          cur: page,
          total: groupsByMax.length,
        };
      }
      return cityListObject;
    } catch (error) {
      const errorMessage = {
        data: cityListObject,
        error: new Error('Get Local Weather City List Error', error),
      };
      return errorMessage;
    }
  }

  async getHostWeatherCitySettingList() {
    await delay(400);
    try {
      let returnData = [];
      const localStorageKey = this.getApiExternalProps('weatherAPILocalStorage');
      const localItemOrigin = localStorage.getItem(localStorageKey);
      if (localItemOrigin) {
        const localItemParse = JSON.parse(localItemOrigin);
        returnData = localItemParse;
      }
      return returnData;
    } catch (error) {
      const errorMessage = {
        data: [],
        error: new Error('Get Local Weather City Setting List Error', error),
      };
      return errorMessage;
    }
  }

  async postHostWeatherCity(cityCode) {
    await delay(400);
    try {
      let returnData = [];
      const localStorageKey = this.getApiExternalProps('weatherAPILocalStorage');
      const localItemOrigin = localStorage.getItem(localStorageKey);
      if (localItemOrigin) {
        const localItemParse = JSON.parse(localItemOrigin);
        localItemParse.push(cityCode);
        localStorage.setItem(localStorageKey, JSON.stringify(localItemParse));
        returnData = localItemParse;
      }
      return returnData;
    } catch (error) {
      const errorMessage = {
        data: [],
        error: new Error('Get Local OrderBoard Item Error', error),
      };
      return errorMessage;
    }
  }

  async deleteHostWeatherCity(cityCode) {
    await delay(400);
    try {
      let returnData = [];
      const localStorageKey = this.getApiExternalProps('weatherAPILocalStorage');
      const localItemOrigin = localStorage.getItem(localStorageKey);
      if (localItemOrigin) {
        const localItemParse = JSON.parse(localItemOrigin);
        const targetItemIndex = localItemParse.findIndex((item) => item.id === cityCode);
        if (targetItemIndex > -1) {
          localItemParse.splice(targetItemIndex, 1);
        }
        localStorage.setItem(localStorageKey, JSON.stringify(localItemParse));
        returnData = localItemParse;
      }
      return returnData;
    } catch (error) {
      const errorMessage = {
        data: [],
        error: new Error('Get Local OrderBoard Item Error', error),
      };
      return errorMessage;
    }
  }

  async getHostWeatherData(cityCode) {
    const defaultReturnValue = {};
    try {
      const result = await this._get(`/data/2.5/forecast?id=${cityCode}&appid=${this.getApiKey()}`, {
        params: {
          units: 'imperial',
        },
      });
      if (Object.keys(result).length > 0) {
        return result;
      }
      return defaultReturnValue;
    } catch (error) {
      const errorMessage = {
        data: defaultReturnValue,
        error: error.response.data,
      };
      return errorMessage;
    }
  }
}

export default WeatherAPI;
