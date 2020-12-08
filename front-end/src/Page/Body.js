import { io } from 'socket.io-client';
import React, { Component } from 'react';
import "./Body.css";
class Body extends Component{
    constructor(props){
        super(props);
        this.state = {
            salonList : [],
            idSalon : "",
            msgList : [],
            sendMessage : "",
            pseudo : ""
        }
        this.socket = undefined;
    }

    refreshSalonList(){
        let header = new Headers();
        fetch('/salons',{
            method : 'GET',
            headers : header,
        })
        .then(data=>data.json())
        .then(data=>{
            console.log(data);
            this.setState({salonList : data.salonList});
        })
        .catch(err=>{console.log(err);});
    }
    createSalon(){
        let header = new Headers();
        fetch('/salon',{
            method : 'POST',
            headers : header,
        })
        .then(data=>data.json())
        .then(data=>{
            this.joinSalon(data.idSalon)
            console.log("wait");
            console.log(data);
        })
        .catch(err=>{console.log(err);});
    }

    joinSalon(idSalon){
        this.socket = io();
        console.log(idSalon);
        this.socket.on('cantjoin',()=>{
            this.socket.emit('disconnection');
            this.setState({socket : undefined,idSalon : ""});
        })
        this.socket.on('joined',()=>{
            this.setState({idSalon : idSalon});
            this.socket.on('messageRecu',(pseudo,msg)=>{
                this.state.msgList.push({pseudo : pseudo, msg : msg, you : false});
                this.setState({msgList : this.state.msgList});
            })
        })
        this.socket.emit('joinSalon',this.state.pseudo,idSalon);
    }

    updateInputValue(evt) {
        this.setState({
            sendMessage: evt.target.value
        });
    }

    updatePseudo(evt) {
        this.setState({
            pseudo: evt.target.value
        });
    }

    sendMessage(){
        this.socket.emit('sendMsg',this.state.sendMessage);
        this.state.msgList.push({pseudo : this.state.pseudo, msg : this.state.sendMessage, you : true});
        this.setState({sendMessage : "", msgList : this.state.msgList})
    }

    componentDidMount(){
        this.refreshSalonList();
    }

    render(){
        console.log(this.state);
        let noConnected = (<div></div>);
        if(this.state.idSalon === ""){
            let salonList = this.state.salonList.map(ele=>(<li>{(ele.idSalon!=null)?ele.idSalon+' '+ele.nbPlayer+'/'+ele.nbMaxPlayer:""}<button onClick={()=>this.joinSalon(ele.idSalon)}>Join</button></li>))
            noConnected = (
            <div>
                 <input type="text" value={this.state.pseudo} onChange={evt => this.updatePseudo(evt)}/>
                <button onClick={()=>this.refreshSalonList()}>Refresh</button>
            <ul>{salonList}
            </ul>
            <button onClick={()=>this.createSalon()}>Add</button></div>);
        }
        else{
            let msg = this.state.msgList.map(ele=>(<li><span className={(ele.you)?"red":"blue"}>{ele.pseudo} : </span>{ele.msg}</li>))
            noConnected=(<div>
                <ul>
                    {msg}
                </ul>
                <input type="text" value={this.state.sendMessage} onChange={evt => this.updateInputValue(evt)}/>
                <button onClick={()=>this.sendMessage()}>Envoyer</button>
            </div>)
        }
        return (<div>{noConnected}</div>);
    }
}
export default Body;