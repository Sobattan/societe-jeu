import './App.css';
import React, {Component} from 'react';
import Home from './pages/Home';
import {Route,Switch, withRouter} from 'react-router-dom';
import LoginSelector from "./Components/LoginSelector";

class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            login : ""
          }
    }

    loginSet(newLogin){
        this.setState({login : newLogin});
    }

    render()
    {
        let ret = undefined;
        if(this.state.login !== ""){
          ret =(<Switch>
                  <Route path='/test' render={this.blueHome}/>
                  <Route path='/default' render={this.blackHome}/>
                  <Route path='/' render={this.game}/>
                </Switch> );
        }
        return (
        <div className="App">
          <Home/>
          {ret}
        </div>);
    }
}

export default App;
