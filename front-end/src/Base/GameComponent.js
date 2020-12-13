import React, { Component } from 'react';
import { io } from 'socket.io-client';
import Chat from '../Components/Chat';
class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            messagesList : []
        };
        this.socket = undefined;
    }
    componentDidMount(){
        console.log(new URLSearchParams(this.props.location.search).get("id"));
        console.log(this.props.login);
        this.socket = io();
        this.joinSalon(new URLSearchParams(this.props.location.search).get("id"));
    }

    leaveSalon(){
        this.socket.disconnect(true);
        this.socket = undefined;
    }

    addMsg(){
        let tab = [].concat(this.state.messagesList);
        tab.push({you:true,msg :"test"});
        this.setState({messagesList : tab});
    }

    joinSalon(idSalon){
        console.log(idSalon);
        this.socket.on('cantjoin',()=>{
            console.log("Serveur fermé");
            this.leaveSalon();
        })
        this.socket.on('joined',()=>{
            console.log("Connexion Ok");
            this.declareOnMessageEvent();
        })
        this.socket.emit('joinSalon',this.props.login,idSalon);
    }

    sendMessage(msg){
        let tab = [].concat(this.state.messagesList);
        tab.push({login : this.props.login, msg : msg, you : true});
        this.socket.emit('sendMsg',msg);
        this.setState({messagesList : tab});
    }

    declareOnMessageEvent(){
        this.socket.on('messageRecu',(pseudo,msg)=>{
            this.state.messagesList.push({pseudo : pseudo, msg : msg, you : false});
            this.setState({messagesList : this.state.messagesList});
        })
    }

    render(){
        return (
            <div className="body">
                <div style={{backgroundColor : this.props.color}} className="main"></div>
                <Chat messagesList={this.state.messagesList} sendMessage={(msg)=>this.sendMessage(msg)}/>
            </div>);
    }
  }
  
  export default Game;