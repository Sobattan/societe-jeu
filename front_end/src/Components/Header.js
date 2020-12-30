import React, {Component} from 'react';
import '../styles/Header.css';


class Header extends Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <div className='Head'>
                <div className='Bande'>
                    <button className="HomeButton">
                        La société du jeu
                    </button>
                    <button className="DonateButton">
                        Donate
                    </button>
                </div>
            </div>
        )
    }
}
export default Header;