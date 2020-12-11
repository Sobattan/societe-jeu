import React, { Component } from 'react';
import "./Body.css";
import LoginSelector from "../Components/LoginSelector";
class Body extends Component{
    constructor(props){
        super(props);
        this.state = {
            login : ""
        }
    }
    loginSet(newLogin){
        this.setState({login : newLogin});
    }

    render(){
        let ret = undefined;
        if(this.state.login !== ""){
            ret =(<div className="body"><div className="main"></div></div>);
        }
        else{
            ret =(<LoginSelector saveLogin={(login)=>this.loginSet(login)}/>);
        }
        return (<div>
                {ret}
             </div>
            );
    }
}
export default Body;