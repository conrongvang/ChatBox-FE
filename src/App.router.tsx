import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import App from './containers/app.container';
import Login from './containers/login.container';
import Register from './components/Register';

export default class AppRouter extends React.Component<{}> {
    render() {
        return(
            <BrowserRouter>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route exact path="/" component={App}/>
                {/* <Route path="/forget_password" component={ForgetPassword}/> */}
            </BrowserRouter>
        );
    }
}