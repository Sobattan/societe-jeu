import React, { Component } from 'react';
import { io } from 'socket.io-client';
class Game extends Component{
    constructor(props){
        super(props);
        this.state = {};
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

    declareOnMessageEvent(){
        this.socket.on('messageRecu',(pseudo,msg)=>{
            this.state.msgList.push({pseudo : pseudo, msg : msg, you : false});
            this.setState({msgList : this.state.msgList});
        })
    }

    render(){
        return (
            <div className="body"><div style={{backgroundColor : this.props.color}} className="main"></div></div>);
    }
  }
  
  export default Game;