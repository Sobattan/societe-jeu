import './App.css';
import React, { Component } from 'react';
import LoginSelector from "./Components/LoginSelector";
import Header from './Components/Header';
import {Route,Switch, withRouter} from 'react-router-dom';
import Home from './Components/Home';

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

  blueHome(){
    return (<Home color="blue"/>);
  }

  blackHome(){
    return (<Home color="black"/>);
  }

  render(){
      let ret = undefined;
      if(this.state.login !== ""){
          ret =(<Switch>
                  <Route path='/test' component={this.blueHome}/>
                  <Route path='/default' component={this.blackHome}/>
                  <Route path='/' component={this.blackHome}/>
                </Switch> );
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

export default withRouter(App);
