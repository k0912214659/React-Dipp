import { USER_ACTION } from '@Reducers/createConstants';
import { errorCatch } from '@Reducers/errorCapture';

/* User */
export const SET_USER_INFO = ({ info }) => ({
  type: USER_ACTION.SET_USER_INFO,
  info,
});
export const SET_USER_IDENTITY = ({ identity }) => ({
  type: USER_ACTION.SET_USER_IDENTITY,
  identity,
});

/* User Actions */
export const getUserSession = () => async (dispatch, getState) => {
  const api = getState().global.globalAPIS.hostAPI;
  const result = await api.user.getUserSession();
  if (!result.error) {
    dispatch(SET_USER_IDENTITY({
      identity: result.identity,
    }));
    dispatch(SET_USER_INFO({
      info: result,
    }));
  }
  if (result.error) {
    dispatch(SET_USER_IDENTITY({
      identity: result.identity,
      error: result.error,
    }));
    dispatch(errorCatch(result.error));
  }
};
export const postUserSession = (email, password, successCallback, failedCallback) => async (dispatch, getState) => {
  const api = getState().global.globalAPIS.hostAPI;
  const result = await api.user.postUserSession(email, password);
  if (!result.error) {
    dispatch(SET_USER_IDENTITY({
      identity: result.identity,
    }));
    dispatch(SET_USER_INFO({
      info: result,
    }));
    if (successCallback) {
      successCallback();
    }
  }
  if (result.error) {
    if (failedCallback) {
      failedCallback();
    }
    dispatch(errorCatch(result.error));
  }
};
export const deleteUserSession = () => async (dispatch, getState) => {
  const api = getState().global.globalAPIS.hostAPI;
  const result = await api.user.deleteUserSession();
  if (!result.error) {
    dispatch(SET_USER_IDENTITY({
      identity: 'guest',
    }));
    dispatch(SET_USER_INFO({
      info: {
        id: '',
        name: '',
        email: '',
        identity: '',
      },
    }));
  }
  if (result.error) {
    dispatch(SET_USER_IDENTITY({
      identity: 'guest',
    }));
    dispatch(SET_USER_INFO({
      info: {
        id: '',
        name: '',
        email: '',
        identity: '',
      },
    }));
    dispatch(errorCatch(result.error));
  }
};
