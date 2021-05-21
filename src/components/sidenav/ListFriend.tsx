import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FIND_USER, UPDATE_USER_INFO } from '../../api/APIs';
import { IState, IUser } from '../../ModelDeclare';

import { IStateContainers } from '../../store/reducers';
import AddFriend from './AddFriend';
import './ListFriend.scss';

interface IListFriend extends IState {
    friendIds?: string[];
};

export default function ListFriend(props: IListFriend) {
    const [search, setSearch] = useState("");

    const isToggle = useSelector((state: IStateContainers) => {
        return state.personal.isToggle;
    });
    
    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    let usersFound: IUser[] = [];
    const [users, setUsers] = useState(usersFound);
    async function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const option = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }
        const params = "?q=" + search;
        try {
            const res = await fetch(FIND_USER + params, option);
            if (res) {
                const result = await res.json();
                console.log(result);
                if (result.resResult.err === true) throw result.resResult.notification;
                console.log(result.resResult.data.users);
                result.resResult.data.users.map((user: IUser) => usersFound.push(user));
                setUsers(usersFound);
            }
        }
        catch (err) {
            throw err;
        }
        console.log(usersFound);
    }

    const onClickAddFriend = async (friendNickname: string | undefined, friendId: string | null) => {
        if (friendId !== null) {
            const friends: string[] = [friendId];
            if (window.confirm(`Would you like add friend with ${friendNickname} ?`)) {
                const option = {
                    method: "PUT",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({_id: props.userId, friends: friends})
                };
                const params = "?userId=" + props.userId;
                try {
                    const res = await fetch(UPDATE_USER_INFO + params, option);
                    if (res) {
                        const result = await res.json();
                        console.log(result);
                        alert(result.resResult.notification);
                    }
                }
                catch (err) {
                    throw err;
                }
            }
            else {
                return;
            }
        }
    }

    let widthForm = document.getElementById("form-search")?.offsetWidth;
    let widthButton = document.getElementById("button-search")?.offsetWidth;

    console.log(props.friendIds)
    return (
        <div
            className="user-sidenav list-friend"
            style={isToggle ? {opacity: 0.3} : {opacity: 1}}
        >
            <form
                id="form-search"
                method="GET"
                onSubmit={handleSubmitSearch}
            >
                <input type="search" value={search} onChange={onChangeSearch} style={(widthButton && widthForm)  ? {width: (widthForm - widthButton)} : {}}/>
                <button id="button-search">Search</button>
            </form>
            <ul>
                {props.friendIds}
                {users.map((user: IUser) =>
                    <AddFriend key={user._id} nickname={user.nickname} userId={user._id} onClickAddFriend={onClickAddFriend}/>
                )}
            </ul>
        </div> 
    );
}