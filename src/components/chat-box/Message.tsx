import React from 'react';

import './Message.scss';

interface IPropsMessage {
    _id?: string;
    isUser: Boolean;
    message?: string;
    colorMessage?: string;
    created_at?: string;
}

export default class Message extends React.Component<IPropsMessage, {}> {
    render() {
        return (
            <li
                className={this.props.isUser ? "message right" : "message left"}
                style={{
                    color: this.props.colorMessage      //Có cách nào nhét thằng này vào external file không ?
                }}>
                   <div> {this.props.message}</div>
                   <div>{this.props.created_at}</div>
            </li>
        );
    }
}