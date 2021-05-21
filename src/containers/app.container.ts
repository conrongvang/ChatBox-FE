import { Dispatch } from 'react';
import { connect } from 'react-redux';

import App from '../components/App';
import { IState } from '../ModelDeclare';
import { getUser } from '../store/actions/app.action';

const mapStateToProps = (): IState => ({
    userId: localStorage.userId,
});

const mapActionToProps = (dispatch: Dispatch<any>) => ({
    getUser: (userId: string) => dispatch(getUser(userId))
});

export default connect(mapStateToProps, mapActionToProps)(App);