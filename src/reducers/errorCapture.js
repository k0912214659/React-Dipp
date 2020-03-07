import { postMessageDialog } from '@Reducers/message/actions';

export const errorCatch = (error, actions) => async (dispatch) => {
  const messageTitle = 'Error';
  const messageContent = error.message;
  const data = {
    typeMessage: 'danger',
    typeTitle: messageTitle,
    typeContent: messageContent,
    onConfirm: () => {
      if (actions) {
        actions();
      }
    },
  };
  dispatch(postMessageDialog(data));
};
