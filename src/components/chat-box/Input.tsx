import React from 'react';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

import './Input.scss'

interface IPropsInput {
    sendMessage: (message: string, colorMessage: string) => void;
}

interface IStateInput {
    message: string;
    colorMessage: string;
}

export default class Input extends React.Component<IPropsInput, IStateInput> {
    inputRef = React.createRef<HTMLInputElement>()

    constructor(props: IPropsInput) {
        super(props);
        this.state = {
            message: "",
            colorMessage: "#ffffff",
        };
        this.enterKey = this.enterKey.bind(this);
        this.changeText = this.changeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    enterKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            this.inputRef?.current?.dispatchEvent((new Event("submit")));   //Lấy event onKeyUp từ input dispatch cho event submit của form
        }
    }

    changeText(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({message: e.target.value})
    }

    
    changeColor(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({colorMessage: e.target.value});
    }
    
    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.sendMessage(this.state.message, this.state.colorMessage);
        this.setState({message: ""});
    }
    
    render () {
        return (
                <form
                    id="form"
                    onSubmit={this.handleSubmit}
                >
                    <input
                        id="input"
                        ref={this.inputRef}
                        name="input"
                        onKeyUp={(e) => this.enterKey(e)}
                        autoComplete="off"
                        onChange={this.changeText}
                        value={this.state.message}
                    />
                    <button type="submit">Send</button>
                    <div id="color">
                        <i
                            className="fa fa-font"
                            style={{color: this.state.colorMessage}}
                        >
                        </i>
                        <input
                            type="color"
                            onChange={this.changeColor} value={this.state.colorMessage}
                        />
                    </div>
                </form>
        )
    }
}