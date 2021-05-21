import { Dispatch } from "react";
import { GET_USER_INFO } from "../../api/APIs";

export const getUser = (userId: string) => async (distpatch: Dispatch<any>) => {
    try {
        const option = {
            method: "GET",
            headers: { "Content-type": "json/application" }
        }
        const params = "userId=" + userId;
        const res = await fetch(GET_USER_INFO + "?" + params, option);
        if (res) {
            const results = await res.json();
            if (results.resResult.err) throw results.resResult.notification;
            return results.resResult.data;
        }
    }
    catch (err) {
        throw err;
    }
}