import { requestUpdatePassword } from '../../api';
import { ActionCreator, NetworkAction, Dispatch, ActionType } from '..';
import { Progress } from '../../data-types';

// TODO: Localize
const startUpdatePasswordRequest: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_UPDATE_PASSWORD,
  progress: Progress.createRequesting('Sending password update request...'),
});

const receiveUpdatePasswordResponse: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_UPDATE_PASSWORD,
  progress: Progress.createSuccess('Password update successful.'),
});

const receiveUpdatePasswordError: ActionCreator<NetworkAction> = err => ({
  type: ActionType.REQUEST_UPDATE_PASSWORD,
  progress: Progress.createError(err.message || 'An unknown error has occured.'),
});

export const clearUpdatePasswordProgress: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_UPDATE_PASSWORD,
  progress: Progress.createNil(),
});

export const updateUserPassword = (newPassword: string) => async (dispatch: Dispatch) => {
  dispatch(startUpdatePasswordRequest());

  try {
    const res = await requestUpdatePassword(newPassword);
    return dispatch(receiveUpdatePasswordResponse(res));
  } catch (err) {
    return dispatch(receiveUpdatePasswordError(err));
  }
};
