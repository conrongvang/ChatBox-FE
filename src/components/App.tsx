import React from 'react';
import socket from '../services/root-socket';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';

import './App.scss';
import UserSideNav from './sidenav/UserSidaNav';
import UserTopNav from './chat-box/UserTopNav';
import Input from './chat-box/Input';
import MessageList from './chat-box/MessageList';
import { IMessages, IData, IUser, IState } from '../ModelDeclare';

interface IPropsApp extends IState {
  getUser: (userId: string) => any;
}

export interface IStateApp extends IMessages {
  user: IUser;
}

class App extends React.Component<IPropsApp, IStateApp> {
  constructor(props: IPropsApp) {
    super(props);
    this.state = {
      messages: [
        {id: 1, userId: null, message: "Hello", colorMessage: "#ffffff"}
      ],
      user: { _id: "", username: "", nickname: "", email: "", avatar: undefined, phone: undefined, friends: [], messages: [] }
    };
    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.receiveNewMessage = this.receiveNewMessage.bind(this);
  }

  async componentDidMount() {
    const userId = this.props.userId || localStorage.getItem("userId");
    if ( userId !== null) {
      const user = await this.props.getUser(userId);
      console.log(user);
      this.setState({user: user});
    }
    socket.on("newMessage", (data: IData) => {
      this.receiveNewMessage(data);
    });
  }

  receiveNewMessage(data: IData) {
    const messages = [...this.state.messages];
    let ids: number[] = [], x: string ="";
    for (x in messages) {
      ids.push(messages[x].id);
    }
    let max = Math.max(...ids); //Get id have max valud in messages[]
    messages.push({
      id: max + 1,                        //----->   Add new id into messges[] {
      userId: data.userId,            //      messages = [{ id: 1, ... }, {id: 2, ...}, ... {id: max, ...}]
      message: data.message,              //      messages = [{ id: 1, ... }, {id: 2, ...}, ... {id: max, ...}, {id: max + 1, ...}]
      colorMessage: data.colorMessage     //
    });                                   //  }
    this.setState({messages: messages});
  }

  sendNewMessage(message: string, colorMessage: string) {
    let data: IData = {
      message: message,
      userId: this.props.userId,
      colorMessage: colorMessage
    };
    if (data)
      socket.emit("newMessage", data);
  }

  render() {
    console.log(this.state.user);
    const cookie = new Cookies();
    if (!cookie.get("userId"))
      return <Redirect to="/login"/>;
    return (
      <div className="App" style={{height: window.innerHeight}}>
        <UserSideNav user={this.state.user} userId={this.props.userId}/>
        <div className="chat-box">
          <UserTopNav />
          <MessageList user={this.state.user} userId={this.props.userId} messages={this.state.messages} />
          <Input sendMessage={this.sendNewMessage} />
        </div>
      </div>
    );
  }
}

export default App;