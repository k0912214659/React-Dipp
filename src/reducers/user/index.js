import produce from 'immer';
import { USER_ACTION } from '@Reducers/createConstants';

export function createUserReducer(params) {
  return (
    state = params.initialState,
    action,
  ) => produce(state, (_draft) => {
    const draft = _draft;
    switch (action.type) {
      case USER_ACTION.SET_USER_INFO:
        draft.updateUserInformation(action.info);
        break;
      case USER_ACTION.SET_USER_IDENTITY:
        draft.updateUserIdentity(action.identity);
        break;
      default:
        break;
    }
  });
}
