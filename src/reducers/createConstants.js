export const GLOBAL_ACTION = Object.freeze({
  SET_GLOBAL_LANG: Symbol('SET_GLOBAL_LANG'),
  SET_GLOBAL_SIDE_BAR: Symbol('SET_GLOBAL_SIDE_BAR'),
});
export const MESSAGE_ACTION = Object.freeze({
  SET_MESSAGE_DIALOG: Symbol('SET_MESSAGE_DIALOG'),
  REMOVE_MESSAGE_DIALOG: Symbol('REMOVE_MESSAGE_DIALOG'),
  SET_MESSAGE_CONFIRM: Symbol('SET_MESSAGE_CONFIRM'),
  REMOVE_MESSAGE_CONFIRM: Symbol('REMOVE_MESSAGE_CONFIRM'),
});
export const USER_ACTION = Object.freeze({
  SET_USER_INFO: Symbol('SET_USER_INFO'),
  SET_USER_IDENTITY: Symbol('SET_USER_IDENTITY'),
});
export const WEATHER_ACTION = Object.freeze({
  SET_WEATHER_CITY_LIST: Symbol('SET_WEATHER_CITY_LIST'),
  SET_WEATHER_CITY_SETTING_LIST: Symbol('SET_WEATHER_CITY_SETTING_LIST'),
  SET_WEATHER_CITY_DATA_LIST: Symbol('SET_WEATHER_CITY_DATA_LIST'),
});
export const AD_ACTION = Object.freeze({
  SET_AD_OBJECT: Symbol('SET_AD_OBJECT'),
  SET_AD_SELECT: Symbol('SET_AD_SELECT'),
});
