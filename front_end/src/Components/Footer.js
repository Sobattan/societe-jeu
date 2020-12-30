import React, {Component} from 'react';
import '../styles/Footer.css';


class Footer extends Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <div className='Bande'>
                <button className="DonateButton">
                    Donate
                </button>
            </div>
        )
    }
}
export default Footer;