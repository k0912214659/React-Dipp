import cloneDeep from 'lodash/cloneDeep';
import Immerable from '@Models/GeneralImmer';

class AD extends Immerable {
  constructor() {
    super();
    this.adContent = {
      list: [],
      selectIndex: -1,
    };
  }

  updateADObject(newAdObject) {
    const cloneNewAdObject = cloneDeep(newAdObject);
    this.adContent = cloneNewAdObject;
  }

  updateADObjectSelect(selected) {
    this.adContent.selectIndex = selected;
  }
}

export default AD;
