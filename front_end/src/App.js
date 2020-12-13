import './App.css';
import React, { Component } from 'react';
import LoginSelector from "./Components/LoginSelector";
import Header from './Components/Header';
import {Route,Switch, withRouter} from 'react-router-dom';
import Home from './Components/Home';
import Game from './Base/GameComponent';

class App extends Component{
  constructor(props){
      super(props);
      this.state = {
        login : ""
      }
      this.game = this.game.bind(this);
  }
  loginSet(newLogin){
      this.setState({login : newLogin});
  }

  game(){
    return (<Game color="black" {...this.props} login={this.state.login}/>)
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
                  <Route path='/test' render={this.blueHome}/>
                  <Route path='/default' render={this.blackHome}/>
                  <Route path='/' render={this.game}/>
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
