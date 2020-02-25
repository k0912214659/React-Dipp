import produce from 'immer';
import { MESSAGE_ACTION } from '@Reducers/createConstants';

export function createMessageReducer(params) {
  return (
    state = params.initialState,
    action,
  ) => produce(state, (_draft) => {
    const draft = _draft;
    switch (action.type) {
      case MESSAGE_ACTION.SET_MESSAGE_DIALOG:
        draft.updateMessageDialogList(action.dialog);
        break;
      case MESSAGE_ACTION.REMOVE_MESSAGE_DIALOG:
        draft.removeMessageDialog();
        break;
      case MESSAGE_ACTION.SET_MESSAGE_CONFIRM:
        draft.updateMessageConfirmList(action.confirm);
        break;
      case MESSAGE_ACTION.REMOVE_MESSAGE_CONFIRM:
        break;
      default:
        break;
    }
  });
}
