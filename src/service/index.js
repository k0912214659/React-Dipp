import { baseServiceTable, baseServiceUserTable } from '@Service/BaseAPIData';

class Service {
  constructor() {
    this.serviceDefaultTable = JSON.parse(JSON.stringify(baseServiceTable));
    this.serviceUserTable = JSON.parse(JSON.stringify(baseServiceUserTable));
    this.serviceTable = {};
    this.initialize();
  }

  initialize() {
    for (let i = 0; i < this.serviceUserTable.length; i += 1) {
      const Model = require(`@Service/${this.serviceUserTable[i]}`).default;
      this.serviceTable[this.serviceUserTable[i]] = new Model();
    }
  }

  setServiceByType(action, passService) {
    switch (action) {
      case 'add':
        if (typeof passService === 'string') {
          const serviceIndex = this.serviceDefaultTable.findIndex((r) => r === passService);
          if (serviceIndex > -1) {
            const Model = require(`@Service/${this.serviceDefaultTable[serviceIndex]}`);
            this.serviceTable[this.serviceDefaultTable[serviceIndex]] = new Model();
          }
        }
        break;
      case 'remove':
        if (typeof passService === 'string') {
          const serviceIndex = this.serviceDefaultTable.findIndex((r) => r === passService);
          if (serviceIndex > -1) {
            delete this.serviceTable[this.serviceDefaultTable[serviceIndex]];
          }
        }
        break;
      default:
        break;
    }
  }

  getServiceDefaultTable() {
    return this.serviceDefaultTable;
  }

  getServiceUserTable() {
    return this.serviceUserTable;
  }

  getServiceTable() {
    return this.serviceTable;
  }

  getServiceByType(service) {
    if (typeof service === 'string') {
      const serviceIndex = this.serviceDefaultTable.findIndex((r) => r === service);
      if (serviceIndex > -1) {
        return this.serviceTable[this.serviceDefaultTable[serviceIndex]];
      }
    }
    return null;
  }
}

export default Service;
