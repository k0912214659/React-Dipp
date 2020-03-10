import { GLOBAL_ACTION } from '@Reducers/createConstants';

/* Global */
export const SET_GLOBAL_LANG = ({ lang }) => ({
  type: GLOBAL_ACTION.SET_GLOBAL_LANG,
  lang,
});
export const SET_GLOBAL_SIDE_BAR = ({ sideBar }) => ({
  type: GLOBAL_ACTION.SET_GLOBAL_SIDE_BAR,
  sideBar,
});

/* Global Action */
export const postGlobalLang = (lang) => async (dispatch) => {
  dispatch(SET_GLOBAL_LANG({
    lang,
  }));
};
export const postGlobalSideBar = (sideBar) => async (dispatch) => {
  dispatch(SET_GLOBAL_SIDE_BAR({
    sideBar,
  }));
};
