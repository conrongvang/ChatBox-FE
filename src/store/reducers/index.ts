import { combineReducers } from 'redux';

import { IState } from '../../ModelDeclare';
import { loginReducer, ILoginState as IStateLogin } from './login.reducer'
import { IStatePersonal, personalReducer } from './personal.reducer';

export const initialState: IState = {
     userId: null,
}

export interface IStateContainers {
     login: IStateLogin;
     personal: IStatePersonal;
}

const reducer = combineReducers<IStateContainers>({
     login: loginReducer,
     personal: personalReducer,
});

export default reducer;