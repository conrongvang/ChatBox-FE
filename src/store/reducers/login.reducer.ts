import { ILoginAction, actiontypeLogin } from '../actions/login.action';
import { IState } from '../../ModelDeclare';
import { initialState } from '.';

export type ILoginState = IState;

export const loginReducer = (state = initialState, action: ILoginAction): ILoginState => {
    switch (action.type) {
        case actiontypeLogin.LOGIN:
            return {
                ...state,
                userId: action.payload,
            };
        default:
            return state;
    }
};