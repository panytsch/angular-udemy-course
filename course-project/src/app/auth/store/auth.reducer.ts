import {User} from '../user.model';
import {AuthActions, AuthActionType} from './auth.actions';

export interface IAuthState {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: IAuthState = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state: IAuthState = initialState, action: AuthActionType): IAuthState {
  switch (action.type) {
    case AuthActions.AuthenticateSuccess:
      let user = new User(action.email, action.id, action.token, action.tokenExpirationDate);
      if (!user.token) {
        user = null;
      }
      return {
        ...state,
        user,
        loading: false
      };
    case AuthActions.Logout:
      return {
        ...state,
        user: null
      };
    case AuthActions.LoginStart:
    case AuthActions.SignUpStart:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.ClearError:
      return {
        ...state,
        authError: null
      };
    case AuthActions.AuthenticateFail:
      return {
        ...state,
        user: null,
        authError: action.errorMessage,
        loading: false
      };
    default:
      return state;
  }
}
