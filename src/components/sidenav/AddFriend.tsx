import './AddFriend.scss';
import { IState } from "../../ModelDeclare";

interface IPropsAddFriend extends IState {
    nickname: string | undefined;
    onClickAddFriend: (nickname: string| undefined, userId: string | null) => Promise<void>;
}

export default function AddFriend(props: IPropsAddFriend) {
    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await props.onClickAddFriend(props.nickname, props.userId);
    };
    return (
        <li>
            {props.nickname ? props.nickname : {}}
            <button id="add-friend" onClick={handleOnClick}>Add friend</button>
        </li>
    );
}