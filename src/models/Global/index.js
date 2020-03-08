import cloneDeep from 'lodash/cloneDeep';
import Immerable from '@Models/GeneralImmer';
import { getHostURL } from '@Tools/url-parser';
import API from '@API';
import Service from '@Service';

class Global extends Immerable {
  constructor(props) {
    super();
    this.globalEnv = props.API_ENV;
    this.globalHost = getHostURL(props.API_ENV);
    this.globalAPIS = {
      serviceAPI: new Service(),
      hostAPI: new API(),
      hostURL: getHostURL(props.API_ENV),
    };
    this.globalLang = 'en';
    this.globalSideBar = false;
  }

  updateGlobalLangs(newGlobalLang) {
    const cloneNewGlobalLang = cloneDeep(newGlobalLang);
    this.globalLang = cloneNewGlobalLang;
  }

  updateGlobalSideBar(newGlobalSideBar) {
    this.globalSideBar = newGlobalSideBar;
  }
}

export default Global;
