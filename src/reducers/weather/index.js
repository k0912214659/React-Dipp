import produce from 'immer';
import { WEATHER_ACTION } from '@Reducers/createConstants';

export function createWeatherReducer(params) {
  return (
    state = params.initialState,
    action,
  ) => produce(state, (_draft) => {
    const draft = _draft;
    switch (action.type) {
      case WEATHER_ACTION.SET_WEATHER_CITY_LIST:
        draft.updateWeatherCityList(action.list);
        break;
      case WEATHER_ACTION.SET_WEATHER_CITY_SETTING_LIST:
        draft.updateWeatherCitySettingList(action.list);
        break;
      case WEATHER_ACTION.SET_WEATHER_CITY_DATA_LIST:
        draft.updateWeatherCityData(action.list);
        break;
      default:
        break;
    }
  });
}
