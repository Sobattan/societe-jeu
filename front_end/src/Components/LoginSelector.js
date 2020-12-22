import React, { Component } from 'react';
import "./LoginSelector.css";
class LoginSelector extends Component{
    constructor(props){
        super(props);
        this.state = {
            login : "",
            clicked : false
        }
        this.submitInputValue = this.submitInputValue.bind(this);
    }

    submitInputValue(evt){
        if(evt.key === "Enter"){
            this.validatePseudo();
        }
    }

    validatePseudo(){
        this.setState({clicked : true});  
    }

    loginChange(newLogin){
        this.setState({login : newLogin});
    }

    isClickedAndLogged(){
        return this.state.clicked && this.state.login!=="";
    }

    isClickedButNotLogged(){
        return this.state.clicked && this.state.login==="";
    }

    afterClick(){
        if(this.state.login !== "" && this.props.saveLogin){
            this.props.saveLogin(this.state.login);
        }
        this.setState({clicked : false});
    }

    render(){
        return (
        <div className="loginSelectorComponent">
            <input className={`${(this.state.login!=="" && this.state.clicked)?"inputDisappear":""}`} type="text" value={this.state.login} onChange={(evt)=>this.loginChange(evt.target.value)} onKeyPress={this.submitInputValue} placeholder="Pseudo"/>
            <button className={`loginSelectorButton ${(this.isClickedAndLogged())?"goodLogin":""} ${(this.isClickedButNotLogged())?"wrongLogin":""}`} onClick={()=>this.validatePseudo()} onAnimationEnd={() => this.afterClick()}>{(this.isClickedAndLogged())?"":"Jouer"}</button>
        </div>
        );
    }
}
export default LoginSelector;