import React, { Component } from 'react';
import "./Header.css";
class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<div className="header">
                <div>La société du jeu</div>
            </div>);
    }
}
export default Header;