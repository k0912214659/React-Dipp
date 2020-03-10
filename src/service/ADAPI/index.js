import BaseAPIService from '@Service/BaseAPIService';
import ADJson from '@Source/AD/ad.json';
import { delay } from '@Tools/utility';

class ADAPI extends BaseAPIService {
  constructor() {
    super();
    this.setApiBaseServiceType('ADAPI');
  }

  async getADObject() {
    await delay(400);
    return {
      list: [ADJson],
      selectIndex: -1,
    };
  }
}

export default ADAPI;
