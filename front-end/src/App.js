import './App.css';
import React, { Component } from 'react';
import LoginSelector from "./Components/LoginSelector";
import Header from './Components/Header';

class App extends Component{
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
      return (
        <div className="App">
          <Header/>
          {ret}
        </div>);
  }
}

export default App;
