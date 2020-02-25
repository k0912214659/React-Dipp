import { GLOBAL_ACTION } from '@Reducers/createConstants';

/* Global */
export const SET_GLOBAL_LANG = ({ lang }) => ({
  type: GLOBAL_ACTION.SET_GLOBAL_LANG,
  lang,
});
export const SET_GLOBAL_API_TARGET = ({ target }) => ({
  type: GLOBAL_ACTION.SET_GLOBAL_API_TARGET,
  target,
});

/* Global Action */
export const postGlobalLang = (lang) => async (dispatch) => {
  dispatch(SET_GLOBAL_LANG({
    lang,
  }));
};
export const postGlobalAPI = (target) => async (dispatch) => {
  dispatch(SET_GLOBAL_API_TARGET({
    target,
  }));
};
