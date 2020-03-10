import produce from 'immer';
import { AD_ACTION } from '@Reducers/createConstants';

export function createADReducer(params) {
  return (
    state = params.initialState,
    action,
  ) => produce(state, (_draft) => {
    const draft = _draft;
    switch (action.type) {
      case AD_ACTION.SET_AD_OBJECT:
        draft.updateADObject(action.content);
        break;
      case AD_ACTION.SET_AD_SELECT:
        draft.updateADObjectSelect(action.select);
        break;
      default:
        break;
    }
  });
}
