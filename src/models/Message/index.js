import cloneDeep from 'lodash/cloneDeep';
import Immerable from '@Models/GeneralImmer';

class Message extends Immerable {
  constructor() {
    super();
    this.messageDialogList = {
      list: [],
    };
    this.messageConfirmList = {
      list: [],
    };
  }

  updateMessageDialogList(newMessageDialogObject) {
    const newCloneMessageDialogObject = cloneDeep(newMessageDialogObject);
    const newCloneMessageDialogList = cloneDeep(this.messageDialogList);
    newCloneMessageDialogList.list.push(newCloneMessageDialogObject);
    this.messageDialogList = newCloneMessageDialogList;
  }

  removeMessageDialog() {
    const newCloneMessageDialogList = cloneDeep(this.messageDialogList.list);
    const newSliceDialogList = newCloneMessageDialogList.slice(1);
    this.messageDialogList.list = newSliceDialogList;
  }

  updateMessageConfirmList(newMessageConfirmObject) {
    const newCloneMessageConfirmObject = cloneDeep(newMessageConfirmObject);
    const newCloneMessageConfirmList = cloneDeep(this.messageConfirmList);
    newCloneMessageConfirmList.list.push(newCloneMessageConfirmObject);
    this.messageConfirmList = newCloneMessageConfirmList;
  }

  removeMessageConfirm() {
    const newCloneMessageConfirmList = cloneDeep(this.messageConfirmList.list);
    const newSliceConfirmList = newCloneMessageConfirmList.slice(1);
    this.messageConfirmList.list = newSliceConfirmList;
  }
}

export default Message;
