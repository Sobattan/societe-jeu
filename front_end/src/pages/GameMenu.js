import { render } from '@testing-library/react';
import React, {Component} from 'react';
import '../styles/GameMenu.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class GameMenu extends Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <div>
                <Header/>
                <Footer/>
            </div>
        )
    }
}
export default GameMenu;