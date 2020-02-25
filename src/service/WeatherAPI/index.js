import BaseAPIService from '@Service/BaseAPIService';

class WeatherAPI extends BaseAPIService {
  constructor() {
    super();
    this.setApiBaseServiceType('WeatherAPI');
    this.setApiBaseUrl('http://api.openweathermap.org');
    this.setApiKey('27e5ae017372abef45f4085ab89232d4');
  }
}

export default WeatherAPI;
