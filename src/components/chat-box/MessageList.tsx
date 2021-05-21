import React from 'react';

import './MessageList.scss';
import Message from './Message';
import { IobjMessage, IMessages, IState, IUser } from '../../ModelDeclare';

interface IMessageListProps extends IState, IMessages {
    user: IUser;
}

export default class MessageList extends React.Component<IMessageListProps, {}> {
    render() {
        let userTopNavHeight = document.getElementById("user-topnav")?.offsetHeight;
        let formHeight = document.getElementById("form")?.offsetHeight;
        return (
            <ul
                id="messages"
                style={{height: (userTopNavHeight && formHeight) ? (window.innerHeight - userTopNavHeight - formHeight) : undefined}}
            >
                {this.props.user.messages ?
                    this.props.user.messages?.map((oldMessage) =>
                        <Message
                            key = {oldMessage?._id}
                            isUser = {true}
                            message = {oldMessage?.content}
                            colorMessage = {oldMessage?.color}
                            created_at = {oldMessage?.created_at}
                        />)
                    : {}
                }
                {this.props.messages.map((item: IobjMessage) =>
                    <Message
                        key = {item.id}
                        isUser = {item.userId === this.props.userId ? true : false}
                        message = {item.message}
                        colorMessage = {item.colorMessage}
                    />)
                }
            </ul>
        );
    }
}