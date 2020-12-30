import React, {Component} from 'react';
import '../styles/Home.css';
import anime from 'animejs';
import LoginSelector from "../Components/LoginSelector";

class Home extends Component
{
    constructor(props)
    {
        super(props);
    }
    componentDidMount()
    {
        this.animation();
    }
    animation()
    {
        var element = document.getElementsByClassName("Nomdusite")[0];

        element.innerHTML = element.textContent.replace(/\S/g,'<span class="letter">$&</span>');

        anime.timeline({loop:true})
        .add({
        targets:'.Nomdusite .letter',
        scale:[3,1],
        opacity:[0,1],
        translateZ:0,
        duration:1000,
        easing:"easeOutExpo",
        delay:(elem, index) => index*70
        })
        .add({
        targets:'.Nomdusite',
        opacity:0,
        duration:1000,
        delay:1000,
        easing:"easeOutExpo"
        })
    }
    render()
    {
        return(
            <div className='Home'>
                <div className='Bande'>
                    <div className='Nomdusite'>
                        La Société du jeu
                    </div>
                    <input className='Pseudo' type='text' placeholder="pseudo"/>
                    <button className="Startbutton">
                        Jouer
                    </button>
                </div>
            </div>
        )
    }
}
export default Home;