import React, { Component } from 'react';
import "./Header.css";
import {a,b} from '../Services/Horloge'
class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        b();
        return (<div className="header">
                <div>La société du jeu</div>
            </div>);
    }
}
export default Header;