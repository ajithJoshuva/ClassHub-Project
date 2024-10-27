import React from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import './home.css'

import ImageSlider from './ImageSlider.js';
import { SliderData } from './SliderData.js';

export default function Home() {
    const navigate = useNavigate();

    const signup = () => {
        console.log("true");
        navigate('/sign-up');
    }

    const signin = () => {
        console.log("true");
        navigate('/sign-in');
    }

    return (
        <div className="homebody">
            <div>
                <nav className=" d-flex justify-content-between align-items-center mr-2">
                    <div className="navbar">
                        <ul className="unlist">
                            <li className="homelink"><a className="alink" href="/home">Home</a></li>
                            <li className="homelink"><a className="alink" href="/home">Features</a></li>
                            <li className="homelink"><a className="alink" href="/home">About</a></li>
                            <li className="homelink"><a className="alink" href="/home">Contact</a></li>
                        </ul>

                        <div className="signup-btn ">
                            <Button onClick={() => signup()} variant="primary sm sign" >Sign up</Button>
                            <Button onClick={() => signin()} variant="primary sm sign"  >Sign in</Button>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="card">
                <div className="image-box">
                    <ImageSlider slides={SliderData} />
                </div>
            </div>
        </div >
    );
}