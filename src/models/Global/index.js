import cloneDeep from 'lodash/cloneDeep';
import Immerable from '@Models/GeneralImmer';
import { getHostURL } from '@Tools/url-parser';
import Service from '@Service';

class Global extends Immerable {
  constructor(props) {
    super();
    this.globalEnv = props.API_ENV;
    this.globalHost = getHostURL(props.API_ENV);
    this.globalAPIS = {
      serviceAPI: new Service(),
      hostAPI: '',
      hostURL: getHostURL(props.API_ENV),
    };
    this.globalLang = 'en';
  }

  updateGlobalLangs(newGlobalLang) {
    const cloneNewGlobalLang = cloneDeep(newGlobalLang);
    this.globalLang = cloneNewGlobalLang;
  }
}

export default Global;
