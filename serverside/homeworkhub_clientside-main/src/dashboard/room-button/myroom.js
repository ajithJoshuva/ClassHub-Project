import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import LoadingSpinner from '../../components/LoadingSpinner';


export default function Myroom() {

  const [token, settoken] = useState('');
  const [userdata, setuserdata] = useState([]);
  const [roomName, setRoomName] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

console.log(token,roomName);

  useEffect(() => {
    const savedToken = window.localStorage.getItem('token');
    settoken(savedToken);
    console.log(savedToken);

    if (savedToken) {
      try {
        fetch("https://435de11b-0111-4742-b1ff-6024437904a3.e1-us-east-azure.choreoapps.dev/myroom", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: savedToken
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setuserdata(data.result);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }, []);

  const navigate = useNavigate();

  const Homework = (a, b, c) => {
    setRoomName(a);
    const dataToSend = { roomName: a };
    console.log(b, c);
    navigate('/dashboard/homework', { state: { data: dataToSend, user: userdata, head: b, users: c } });
  }

  if (loading) {
    return <LoadingSpinner />;
  }
  else {
    return (
      <div className="background">
      <div className="myroom-body">
        <div>
          <Header />
        </div>
        <div className="grid-container">
          {userdata && userdata.map((item, index) => (
            <button key={index} className="grid-item" onClick={() => Homework(item.roomname, item.roomhead, item.users)}>{item.roomname}</button>
          ))}
        </div>
      </div>
      </div>
    );
  }
}
