import produce from 'immer';
import { GLOBAL_ACTION } from '@Reducers/createConstants';

export function createGlobalReducer(params) {
  return (
    state = params.initialState,
    action,
  ) => produce(state, (_draft) => {
    const draft = _draft;
    switch (action.type) {
      case GLOBAL_ACTION.SET_GLOBAL_LANG:
        draft.updateGlobalLangs(action.lang);
        break;
      case GLOBAL_ACTION.SET_GLOBAL_SIDE_BAR:
        draft.updateGlobalSideBar(action.sideBar);
        break;
      default:
        break;
    }
  });
}
