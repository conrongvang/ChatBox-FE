import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';
import { UPDATE_USER_INFO } from '../../api/APIs';
import { IState, IUser } from '../../ModelDeclare';
import { IStateContainers } from '../../store/reducers';
import { actionPersonal } from '../../store/reducers/personal.reducer';

import './Personal.scss';

interface IPropsPersonal extends IState {
    user: IUser;
}

export default function Personal(props: IPropsPersonal) {
    const { user } = props;

    // const [state, dispatch] = useReducer(personalReducer, initialStatePersonal);
    useSelector((state: IStateContainers) => state.personal.isToggle);
    const dispatchToggle = useDispatch();
    const refAvatar = React.createRef<HTMLDivElement>();

    function getUserInfo(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        refAvatar.current?.classList.toggle("show");
        if (refAvatar.current?.className === "user-info show")
            dispatchToggle(actionPersonal(true));
        else
            dispatchToggle(actionPersonal(false));
    }

    const [nickname, setNickname] = useState("");
    function onChangeNickname(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setNickname(e.target.value);
    }
    
    const [email, setEmail] = useState("");
    function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setEmail(e.target.value);
    }

    
    const [phone, setPhone] = useState("");
    function onChangePhone(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setPhone(e.target.value);
    }
    
    const [dateOfBirth, setDateOfBirth] = useState("");
    function onChangeDateOfBirth(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setDateOfBirth(e.target.value);
    }
    
    async function handleSubmit(e: React.MouseEvent<HTMLFormElement>) {
        e.preventDefault();
        const option = {
            method: "PUT",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
                _id: props.userId,
                nickname: (nickname === "") ? undefined : nickname,
                email: (email === "") ? undefined : email,
                phone: (phone === "") ? undefined : phone,
                dateOfBirth: (dateOfBirth === "") ? undefined : dateOfBirth,
            })
        };
        const params = "?userId=" + props.userId;
        try {
            const res = await fetch(UPDATE_USER_INFO + params, option);
            const result = await res.json();
            alert(result.resResult.notification);
        }
        catch (err) {
            throw err;
        }
    }

    const [redirect, setRedirect] = useState(false);
    function onClickSignOut(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        localStorage.removeItem("userId");
        const cookie = new Cookies();
        cookie.remove("userId");
        dispatchToggle(actionPersonal(false));
        setRedirect(true);
    }

    return (
        <div className="user-sidenav personal">
            {redirect && <Redirect to="/login"/>}
            <div
                ref={refAvatar}
                className="user-info"
            >
                <div id="label-personal">User info</div>
                <form
                    className="form personal"
                    method="PUT"
                    onSubmit={handleSubmit}
                >
                    <label>Nickname:</label>
                    <input type="text" autoComplete="off" placeholder={props.user.nickname} onChange={onChangeNickname} value={nickname}/>
                    <label>Email:</label>
                    <input type="text" autoComplete="off" placeholder={props.user.email} onChange={onChangeEmail} value={email}/>
                    <label>Phone:</label>
                    <input type="text" autoComplete="off" placeholder={props.user.phone?.toString()} onChange={onChangePhone} value={phone}/>
                    <label>Date of birth:</label>
                    <input type="text" autoComplete="off" placeholder={props.user.birthday?.toString()} onChange={onChangeDateOfBirth} value={dateOfBirth}/>
                    <button>Save</button>
                </form>
                <button id="button-personal" onClick={onClickSignOut}>Sign out</button>
            </div>
            <div
                className="avatar"
                onClick={getUserInfo}
            >
                Avatar
            </div>
            <div>{user.nickname}</div>
        </div>
    );
}