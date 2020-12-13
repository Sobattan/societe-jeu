import React, { Component } from 'react';
import './Chat.css'
class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {
            unreadMessages : 0,
            open : false,
            msgInput : ""
        };
        this.submitInputValue = this.submitInputValue.bind(this);
        this.messagesNb = 0;
    }

    componentDidUpdate(prevProps, prevState){
        let nbMsgAfter = this.props.messagesList.length;
        console.log("component did update");
        console.log(this.messagesNb);
        console.log(nbMsgAfter);
        if(!this.state.open && !prevState.open && this.messagesNb < nbMsgAfter){
            console.log("test");
            this.messagesList = this.props.messagesList;
            let newUnreadMsgNb = this.state.unreadMessages + nbMsgAfter-this.messagesNb;
            this.messagesNb = nbMsgAfter;
            this.setState({unreadMessages : newUnreadMsgNb})
        }
        else{
            this.messagesNb = this.props.messagesList.length;
        }
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    openAndCloseChat(){
        if(this.state.open){
            this.setState({open : false});
        }
        else{
            this.setState({unreadMessages : 0, open : true});
        }
    }

    submitInputValue(evt){
        if(evt.key === "Enter"){
            this.props.sendMessage(this.state.msgInput);
            this.setState({msgInput : ""});
        }
    }

    msgChange(msg){
        this.setState({msgInput : msg});
    }

    render(){
        let messages = this.props.messagesList.map((ele,i)=>(<div key={i} className="chatbubbleline">
                                                            <div className={`${(ele.you)?"right":"left"}bubble`}>
                                                                {ele.msg}
                                                                <div className={`${(ele.you)?"right":"left"}bubbletriangle`}></div>
                                                            </div>
                                                        </div>));
        return (<div className="chatbox">
                <div className={`chatheader`} onClick={()=>this.openAndCloseChat()}>
                    {(this.state.unreadMessages>0)?(<div className="chatpastille">{(this.state.unreadMessages>99)?"99+":this.state.unreadMessages}</div>):(<div></div>)}
                </div>
                <div className={`chatbody ${(this.state.open)?"":"hidden"}`}>
                    <div className="chatcontent">
                        {messages}
                        <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
                    </div>
                    <div className="chatsender">
                        <input className="chatinput" type="text" value={this.state.msgInput} onChange={(evt)=>this.msgChange(evt.target.value)} onKeyPress={this.submitInputValue}/>
                        <button className="chatbutton" onClick={()=>this.submitInputValue()}>send</button>
                    </div>
                </div>
        </div>);
    }
  }
  
  export default Chat;