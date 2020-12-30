import './App.css';
import React, {Component} from 'react';
import Home from './pages/Home';
import GameMenu from './pages/GameMenu';

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
        return(
                <Home/>
        );
    }
}

export default App;
