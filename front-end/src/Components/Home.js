import React, { Component } from 'react';

class Home extends Component{
  
    render(){
        return (
            <div className="body"><div style={{backgroundColor : this.props.color}} className="main"></div></div>);
    }
  }
  
  export default Home;