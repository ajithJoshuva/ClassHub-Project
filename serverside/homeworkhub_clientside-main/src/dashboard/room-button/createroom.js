import React, { useState, useEffect } from 'react';
import Header from '../header';
import LoadingSpinner from '../../components/LoadingSpinner';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Createroom() {
  const [roomname, setroomname] = useState('')
  const [rollnum, setrollnnum] = useState('')
  const [token, settoken] = useState('')
  const [invitecode, setinvitecode] = useState('Your invite code displays here')
  const [isLoading, setIsLoading] = useState(false);

  // Loader
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('token');
    if (storedToken) {
      settoken(storedToken);
    }
  }, []);

  useEffect(() => {
    const storedRollnum = window.localStorage.getItem('rollnum');
    if (storedRollnum) {
      setrollnnum(storedRollnum);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(token, roomname, rollnum);
    setIsLoading(true);
    try {
      fetch("https://435de11b-0111-4742-b1ff-6024437904a3.e1-us-east-azure.choreoapps.dev/createroom", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          roomname,
          token,
          rollnum
        }),
      })

        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success === true) {
            setinvitecode(data.result.invitecode)
            setIsLoading(false)
          }
          else {
            alert(data.message);
            setIsLoading(false)
          }
        });

    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <div className='background'>
      {loading ? (
        <LoadingSpinner />) : (

        // <div className='crateroom-body'>
        <div className="background">
          <div>
            <Header />
          </div>
          <div >
            {isLoading ? (<LoadingSpinner />) :
              (
                <div className="CreateRoom">

                  <div className='content mx-auto'>
                    <h1 className='content-head'>Welcome to our platform! </h1>
                    <p>This code serves as the key for students to enter their respective classrooms.
                      This invite code is essential for accessing your classroom. Keep it safe,
                      as it will be your ticket to join your class discussions and activities. This is your room's invite code.
                    </p>
                    <div className='invitecode'>{invitecode}</div>
                    <center><p><a href='/dashboard/myroom'>Click here</a> to go to Myroom</p></center>
                  </div>


                  <div className='RoomName'>

                    <TextField
                      required
                      id="outlined-required"
                      label="Class Name"
                      onChange={(e) => setroomname(e.target.value)}
                    />
                    <br></br>

                    <Button variant="contained" onClick={handleSubmit}>Createroom</Button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      )
      }

    </div>

  );
};


