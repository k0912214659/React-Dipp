import cloneDeep from 'lodash/cloneDeep';
import Immerable from '@Models/GeneralImmer';
import { Guest, Client, Admin } from '@Base/identity';

class User extends Immerable {
  constructor() {
    super();
    this.userIdentity = Guest;
    this.userInformation = {
      id: '',
      name: '',
    };
  }

  updateUserInformation(newUserInformation) {
    const cloneNewUserInformation = cloneDeep(newUserInformation);
    this.userInformation = cloneNewUserInformation;
  }

  updateUserIdentity(identityID) {
    switch (identityID) {
      case 1:
        this.userIdentity = Admin;
        break;
      case 2:
        this.userIdentity = Client;
        break;
      case 3:
        this.userIdentity = Guest;
        break;
      default:
        this.userIdentity = Guest;
        break;
    }
  }
}

export default User;
