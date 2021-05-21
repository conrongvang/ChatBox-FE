import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { REGISTER } from '../api/APIs';

import './Register.scss';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUsername(e.target.value);
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const buttonRef = React.createRef<HTMLButtonElement>();
    const enterKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.keyCode === 13) {
            buttonRef.current?.dispatchEvent(new Event("submit"));
        }
    }

    async function register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (password !== rePassword) alert("Re-password wrong!");
        else {
            const option = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, password})
            }
            try {
                const response = await fetch(REGISTER, option);
                if (response) {
                    const result = await response.json();
                    if (result.resResult.err) alert(result.resResult.notification);
                    alert(result.resResult.notification);
                    setRedirect(true);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        setPassword("");
        setRePassword("");
    }

    function onChangeRePassword(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setRePassword(e.target.value);
    }
    
    if (redirect) {
        return (<Redirect to="/login" />);    
    }

    return (
        <form
            className="form register"
            method="POST"
            onSubmit={register}
        >
            <label>Username:</label>
            <input
                className="input username"
                type="text"
                name="username"
                autoComplete="off"
                onChange={onChangeUsername}
                value={username}
            />
            <label>Password:</label>
            <input
                className="input password"
                type="password"
                name="password"
                autoComplete="off"
                onChange={onChangePassword}
                value={password}
            />
            <label>Re-Password:</label>
            <input
                className="input password"
                type="password"
                name="re-password"
                autoComplete="off"
                onChange={onChangeRePassword}
                value={rePassword}
            />
            <button
                onKeyUp={enterKey}
                ref={buttonRef}
            >
                Register
            </button>
        </form>
    );
}