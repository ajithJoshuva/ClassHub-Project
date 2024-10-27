import React, { useEffect, useState } from 'react';
// import createroom from './room-button/createroom';


function Dashbody() {
    const [usertype, setusertype] = useState('');


    useEffect(() => {
        const storedType = window.localStorage.getItem('usertype');
        if (storedType) {
            setusertype(storedType);
        }
    }, []);

    return (
    

            <div className='dashbody'>
                <div className="content">
                    <h1><p className='content-head'> Welcome to our Homework Hub for Students!</p></h1>
                    <p>
                        Are you tired of juggling multiple platforms and resources to manage your assignments?
                        Look no further! Our Homework Hub provides a centralized space where students can efficiently organize,
                        track, and complete their homework assignments with ease.
                    </p>
                </div>
                <div className="room-button">
                    {usertype === 'faculty' ?
                        (
                            <div className='room-div'>
                                <button type="submit" className="room">
                                    <a className="roomlink" href="dashboard/createroom">Create Room</a>
                                </button>
                                <button type='submit' className="room">
                                    <a className="roomlink" href="dashboard/joinroom">Join Room</a>
                                </button>
                                <button type='submit' className="room">
                                    <a className="roomlink" href="dashboard/myroom">My Room</a>
                                </button>
                            </div>
                        ) :
                        (
                            <div className="room-div">
                                {/*  <button type="submit" classname="createroom">
                               Create Room
                             </button> */}
                                <button type='submit' className="room">
                                    <a className="roomlink" href="dashboard/joinroom">Join Room</a>
                                </button>
                                <button type='submit' className="room">
                                    <a className="roomlink" href="dashboard/myroom">My Room</a>
                                </button>
                            </div>


                        )
                    }
                </div>
            </div>
        
    );

}


export default Dashbody;