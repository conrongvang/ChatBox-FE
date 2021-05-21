import { Dispatch } from "redux";
import Cookies from "universal-cookie";

import { LOGIN } from "../../api/APIs";
import { IState } from "../../ModelDeclare";


export enum actiontypeLogin {
    LOGIN = "login",
}

export interface ILoginAction {
    type: actiontypeLogin;
    payload: string;
}

export const login = (data: string): ILoginAction => ({
    type: actiontypeLogin.LOGIN,
    payload: data
});

export const fetchUser = (username: string, password: string) => async (dispatch: Dispatch<ILoginAction>, getState: () => IState) => {
    try {
        const res = await fetch(LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password})
        });
        if (res) {
            const results = await res.json();
            if (!results.resResult.err) {
                localStorage.setItem("userId", results.resResult.data);
                const cookies = new Cookies();
                cookies.set("userId", results.resResult.data, {path: "/"});
            }
            else
                alert(results.resResult.notification);
        }
    }
    catch(err) {
        console.log(err);
    }
}