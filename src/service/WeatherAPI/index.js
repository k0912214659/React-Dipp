import BaseAPIService from '@Service/BaseAPIService';
import CityJson from '@Source/City/city.json';
import { delay } from '@Tools/utility';

class WeatherAPI extends BaseAPIService {
  constructor() {
    super();
    this.setApiBaseServiceType('WeatherAPI');
    this.setApiBaseUrl('http://api.openweathermap.org');
    this.setApiKey('27e5ae017372abef45f4085ab89232d4');
  }

  async getHostWeatherCityList(page = 1, query = '', max = 10) {
    await delay(400);
    const groupsByMax = [];
    const cityListObject = {
      list: [],
      page: {
        cur: 1,
        total: 1,
      },
    };
    const cityListFiler = query ? CityJson.filter((city) => city.name.toLowerCase().indexOf(query.toLowerCase()) > -1) : CityJson;
    try {
      for (let i = 0, len = cityListFiler.length; i < len; i += max) {
        groupsByMax.push(cityListFiler.slice(i, i + max));
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

  async getHostWeatherData(cityCodeArray) {
    const defaultReturnValue = [];
    try {
      const result = [];
      for (let i = 0; i < cityCodeArray.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const res = await this._get(`/data/2.5/forecast?id=${cityCodeArray[i]}&appid=${this.getApiKey()}`, {
          params: {
            units: 'imperial',
          },
        });
        result.push(res);
        // eslint-disable-next-line no-await-in-loop
        await delay(400);
      }
      if (result.length > 0) {
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
