import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { IState } from '../ModelDeclare';

import './Login.scss';

interface IPropsLogin extends IState{
    fetchUser: (username: string, password: string) => void;
}

interface IStateLogin {
    username: string;
    password: string;
}

const cookies = new Cookies();

export default class Login extends React.Component<IPropsLogin, IStateLogin> {
    constructor(props: IPropsLogin) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);
        this.enterKey = this.enterKey.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    buttonRef = React.createRef<HTMLButtonElement>();
    enterKey(e: React.KeyboardEvent<HTMLButtonElement>) {
        if (e.keyCode === 13)
            this.buttonRef?.current?.dispatchEvent((new Event("submit")));
    }

    async login (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await this.props.fetchUser(this.state.username, this.state.password);
        this.setState({username: "", password: ""});
    }

    onChangeUserName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({username: e.target.value});
    }
    onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({password: e.target.value});
    }

    componentWillUnmount() {
        ReactDOM.findDOMNode(this)?.remove();
    }

    render() {
        if (cookies.get("userId"))
            return (<Redirect to="/"/>);
        else {
            return (
                <form
                    className="form login"
                    method="POST"
                    onSubmit={this.login}
                >
                    <label>Username:</label>
                    <input
                        className="input username"
                        type="text"
                        name="username"
                        autoComplete="off"
                        onChange={this.onChangeUserName}
                        value={this.state.username}
                    />
                    <label>Password:</label>
                    <input
                        className="input password"
                        type="password"
                        name="password"
                        autoComplete="off"
                        onChange={this.onChangePassword}
                        value={this.state.password}
                    />
                    <button
                        onKeyUp={this.enterKey}
                        ref={this.buttonRef}
                    >
                        Login
                    </button>
                    <div><Link to="/register">Register</Link></div>
                </form>
            );
        }
    }
}