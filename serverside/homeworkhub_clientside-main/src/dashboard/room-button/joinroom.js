import React, { useState, useEffect } from 'react';
import Header from '../header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingSpinner from '../../components/LoadingSpinner';


export default function Joinroom() {
  const [invitecode, setinvitecode] = useState('')
  const [token, settoken] = useState('')

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

  function handleSubmit(e) {
    e.preventDefault();

    console.log(invitecode);
    fetch("https://435de11b-0111-4742-b1ff-6024437904a3.e1-us-east-azure.choreoapps.dev/joinroom", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        invitecode,
        token
      }),
    })

      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
        if (data.success === true) {
          window.location.href = "./myroom";
        }
        else {
          alert(data.message);
        }
      });
  }


  return (
    <div className='background'>
      <div>
        <Header />
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className='CreateRoom'>
          <div className='content mx-auto'>
            <h1 className='content-head'>Welcome to our classroom portal!</h1>
            <p className='JoinPara'>To join your classroom, simply enter the invite code provided by your teacher below and
              click 'Join'. This unique code ensures secure access to your class materials and activities.
              If you haven't received an invite code yet, please reach out to your instructor.
              Let's embark on this educational journey together!
            </p>

          </div>


          <div className="RoomName">
            <TextField
            required
            id="outlined-required"
            label="Invite Code"
            onChange={(e) => setinvitecode(e.target.value)}
          />
            <br></br>
            <Button variant="contained" onClick={handleSubmit}>Joinroom</Button>
          </div>
        </div>
      )
      }
    </div>

  );
};


