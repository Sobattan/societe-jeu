import React, { Component } from 'react';
import "./Body.css";
class Body extends Component{
    constructor(props){
        super(props);
        this.state = {
            clicked : false,
            login : "",
            main : false
        }
    }

    validatePseudo(){
        this.setState({clicked : true});  
    }

    loginChange(newLogin){
        this.setState({login : newLogin});
    }

    render(){
        let ret = undefined;
        if(this.state.main){
            ret =(<div className="body"><div className="main"></div></div>);
        }
        else{
            ret =(<div className="body">
                <input className={`${(this.state.login!=="" && this.state.clicked)?"inputTrans":""}`} type="text" value={this.state.login} onChange={(evt)=>this.loginChange(evt.target.value)}/>
                <button className={`button ${(this.state.clicked && this.state.login!=="")?"transOut":""} ${(this.state.clicked && this.state.login==="")?"wrongLogin":""}`} onClick={()=>this.validatePseudo()} onAnimationEnd={() => {let main = this.state.login !=="";this.setState({clicked : false, main : main})}}> Jouer </button>
                </div>);
        }
        return (<div>
                {ret}
             </div>
            );
    }
}
export default Body;