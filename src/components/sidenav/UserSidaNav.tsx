import './UserSideNav.scss';
import Personal from './Personal';
import ListFriend from './ListFriend';
import { IState, IUser } from '../../ModelDeclare';

interface IUserSideNavProps extends IState {
    user: IUser;
}

export default function UserSideNav(props: IUserSideNavProps) {
    console.log(props.user.friends);
    return (
        <div className="user-sidenav">
            <Personal user={props.user} userId={props.userId}/>
            <ListFriend userId={props.userId} friendIds={props.user.friends}/>
        </div>
    );
}