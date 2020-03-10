import { MESSAGE_ACTION } from '@Reducers/createConstants';

/* Dialog */
export const SET_MESSAGE_DIALOG = ({ dialog }) => ({
  type: MESSAGE_ACTION.SET_MESSAGE_DIALOG,
  dialog,
});
export const REMOVE_MESSAGE_DIALOG = () => ({
  type: MESSAGE_ACTION.REMOVE_MESSAGE_DIALOG,
});

/* Confirm */
export const SET_MESSAGE_CONFIRM = ({ confirm }) => ({
  type: MESSAGE_ACTION.SET_MESSAGE_CONFIRM,
  confirm,
});
export const REMOVE_MESSAGE_CONFIRM = () => ({
  type: MESSAGE_ACTION.REMOVE_MESSAGE_CONFIRM,
});

/* Dialog Action */
export const postMessageDialog = (data) => async (dispatch) => {
  dispatch(SET_MESSAGE_DIALOG({
    dialog: data,
  }));
};
export const removeMessageDialog = () => async (dispatch) => {
  dispatch(REMOVE_MESSAGE_DIALOG());
};

/* Confirm Action */
export const postMessageConfirm = (data) => async (dispatch) => {
  dispatch(SET_MESSAGE_CONFIRM({
    confirm: data,
  }));
};
export const removeMessageConfirm = () => async (dispatch) => {
  dispatch(REMOVE_MESSAGE_CONFIRM());
};
