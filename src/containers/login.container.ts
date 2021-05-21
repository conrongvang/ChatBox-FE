import { connect } from 'react-redux';
import { Dispatch } from 'react';

import Login from "../components/Login";
import { IStateContainers } from "../store/reducers";
// import { login } from "../store/actions/login.action"
import { fetchUser } from '../store/actions/login.action';
import { ILoginState } from '../store/reducers/login.reducer';


const mapStateToProps = (state: IStateContainers): ILoginState => {
    return {
        userId: state.login.userId,
    };
}

const mapActionToProps = (dispatch: Dispatch<any>) => ({
    // login: (data: string) => dispatch(login(data)),
    fetchUser: (username: string, password: string) => dispatch(fetchUser(username, password)),
});

export default connect(mapStateToProps, mapActionToProps)(Login);