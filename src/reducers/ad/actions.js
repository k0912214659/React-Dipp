import { AD_ACTION } from '@Reducers/createConstants';
import { errorCatch } from '@Reducers/errorCapture';

/* AD */
export const SET_AD_OBJECT = ({ content }) => ({
  type: AD_ACTION.SET_AD_OBJECT,
  content,
});
export const SET_AD_SELECT = ({ select }) => ({
  type: AD_ACTION.SET_AD_SELECT,
  select,
});

/* AD Actions */
export const getADObject = () => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.serviceAPI;
  const result = await apiObject.getServiceByType('ADAPI').getADObject();
  if (!result.error) {
    dispatch(SET_AD_OBJECT({
      content: result,
    }));
  }
  if (result.error) {
    dispatch(SET_AD_OBJECT({
      content: result,
    }));
    dispatch(errorCatch(result.error));
  }
};
export const postADObjectSelect = (selectIndex) => async (dispatch) => {
  dispatch(SET_AD_SELECT({
    select: selectIndex,
  }));
};
