import cloneDeep from 'lodash/cloneDeep';
import Immerable from '@Models/GeneralImmer';
import { Guest, Client, Admin } from '@Base/identity';

class User extends Immerable {
  constructor() {
    super();
    this.userIdentity = null;
    this.userInformation = {
      id: '',
      name: '',
      email: '',
      identity: '',
    };
  }

  updateUserInformation(newUserInformation) {
    const cloneNewUserInformation = cloneDeep(newUserInformation);
    this.userInformation = cloneNewUserInformation;
  }

  updateUserIdentity(identity) {
    switch (identity) {
      case 'admin':
        this.userIdentity = Admin;
        break;
      case 'client':
        this.userIdentity = Client;
        break;
      case 'guest':
        this.userIdentity = Guest;
        break;
      default:
        this.userIdentity = null;
        break;
    }
  }
}

export default User;
