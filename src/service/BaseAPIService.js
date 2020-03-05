import axios from 'axios';
import { getApiDelay } from '@Service/BaseServiceTools';

class BaseAPIService {
  constructor() {
    this.baseAPIServiceType = '';
    this.baseAPIUrl = '';
    this.baseAPIKey = '';
    this.baseHeader = {};
    this.baseAPIClient = axios.create();
    this.baseAPIRateLimit = 300;
    this.baseAPIRefreshFunction = null;
    this.baseAPIExternalProps = {};
  }

  setApiHeader(apiHeader) {
    if (apiHeader && Object.keys(apiHeader).length > 0) {
      const newHeader = {
        ...apiHeader,
      };
      this.baseHeader = newHeader;
    }
  }

  setApiAccessToken(apiAccessToken) {
    if (apiAccessToken && typeof apiAccessToken === 'string') {
      this.baseToken = apiAccessToken.trim();
      this.setApiHeader({
        Authorization: `Bearer ${this.baseToken}`,
      });
    }
  }

  setApiBaseUrl(apiUrl) {
    if (apiUrl && typeof apiUrl === 'string') {
      this.baseAPIUrl = apiUrl.trim();
      this.baseAPIClient.defaults.baseURL = this.baseAPIUrl;
    }
  }

  setApiKey(apiKey) {
    if (apiKey && typeof apiKey === 'string') {
      this.baseAPIKey = apiKey;
    }
  }

  setApiRateLimit(apiRateLimit) {
    if (typeof apiRateLimit === 'number' && apiRateLimit >= 0) {
      this.baseAPIRateLimit = apiRateLimit;
    }
  }

  setApiRefreshTokenFunction(refreshFunction) {
    if (typeof refreshFunction === 'function') {
      this.baseAPIRefreshFunction = refreshFunction;
    }
  }

  setApiBaseServiceType(serviceType) {
    if (typeof serviceType === 'string') {
      this.baseAPIServiceType = serviceType;
    }
  }

  setApiExternalProps(propertyName, propertyValue) {
    if (propertyName && typeof propertyName === 'string' && propertyValue) {
      this.baseAPIExternalProps[propertyName.trim()] = propertyValue;
    }
  }

  setApiBaseClient(serviceClient) {
    this.baseAPIClient = serviceClient;
  }

  getApiBaseUrl() {
    return this.baseAPIUrl;
  }

  getApiAccessToken() {
    return this.baseToken;
  }

  getApiHeader() {
    return this.baseHeader;
  }

  getApiKey() {
    return this.baseAPIKey;
  }

  getApiRateLimit() {
    return this.baseAPIRateLimit;
  }

  getApiRefreshTokenFunction() {
    return this.baseAPIRefreshFunction;
  }

  getApiServiceType() {
    return this.baseAPIServiceType;
  }

  getApiExternalProps(externalProps) {
    if (typeof externalProps === 'string') {
      if (externalProps in this.baseAPIExternalProps) {
        return this.baseAPIExternalProps[externalProps];
      }
    }
    return null;
  }

  getApiClient() {
    return this.baseAPIClient;
  }

  async triggerDelayForRateLimit() {
    if (this.baseAPIRateLimit > 0) {
      await getApiDelay(this.baseAPIRateLimit);
    }
  }

  async _get(url, {
    headers,
    params,
  } = {}) {
    try {
      const res = await this.baseAPIClient({
        method: 'get',
        headers: {
          ...this.baseHeader,
          ...headers,
        },
        url,
        params,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async _post(url, {
    headers,
    params,
    data,
    onUploadProgress,
    responseType,
  } = {}) {
    try {
      const res = await this.baseAPIClient({
        method: 'post',
        headers: {
          ...this.baseHeader,
          ...headers,
        },
        url,
        onUploadProgress,
        params,
        data,
        responseType,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async _put(url, {
    headers,
    params,
    data,
    onUploadProgress,
  } = {}) {
    try {
      const res = await this.baseAPIClient({
        method: 'put',
        headers: {
          ...headers,
          ...this.baseHeader,
        },
        url,
        onUploadProgress,
        params,
        data,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async _patch(url, {
    headers,
    params,
    data,
  } = {}) {
    try {
      const res = await this.baseAPIClient({
        method: 'patch',
        headers: {
          ...headers,
          ...this.baseHeader,
        },
        url,
        params,
        data,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async _delete(url, {
    headers,
    params,
  } = {}) {
    try {
      const res = await this.baseAPIClient({
        method: 'delete',
        headers: {
          ...headers,
          ...this.baseHeader,
        },
        url,
        params,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}

export default BaseAPIService;
