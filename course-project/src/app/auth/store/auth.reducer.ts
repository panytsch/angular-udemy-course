import {User} from '../user.model';
import {AuthActions, AuthActionType} from './auth.actions';

export interface IAuthState {
  user: User;
}

export function authReducer(state: IAuthState, action: AuthActionType): IAuthState {
  switch (action.type) {
    case AuthActions.Login:
      let user = new User(action.email, action.id, action.token, action.tokenExpirationDate);
      if (!user.token) {
        user = null;
      }
      return {
        ...state,
        user
      };
    case AuthActions.Logout:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
