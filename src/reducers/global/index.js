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
      case GLOBAL_ACTION.SET_GLOBAL_API_TARGET:
        draft.updateGlobalAPITarget(action.target);
        break;
      default:
        break;
    }
  });
}
