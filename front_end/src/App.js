import './App.css';
import React, {Component} from 'react';
import Home from './pages/Home';

class App extends Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
          <Home/>
        );
    }
}

export default App;
