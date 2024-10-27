import React, { useEffect, useState,useCallback } from "react";
import Header from '../header';

import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';


export default function Homework() {
  const location = useLocation();
  const receivedData = location.state?.data;    //receive data
  var userdata = location.state?.user;        //receive data
  const [faculty, setfaculty] = useState('');
  const [student, setstudent] = useState('');
  const [token, settoken] = useState('');
  const [subject, setsubject] = useState([]);
  // const [sub, setsub] = useState('');
  const [roomname, setroomname] = useState('');
  const [users, setusers] = useState(location.state?.users);
  // const rollnumber = window.localStorage.getItem('rollnum');
  var [head] = useState(location.state?.head);
  const [posted, setposted] = useState('');
  const usertype = window.localStorage.getItem('usertype');

  /*code to enable loading*/

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  console.log(head, "head");

  /*Variables for homework posting*/

  const [subname, setsubname] = useState('');
  const [subdis, setsubdis] = useState('');
  const [upload, setupload] = useState('');

  /*Used for re-rendering*/
  const room = (a, b) => {
    setroomname(a);
    setusers(b);
    userdata = location.state?.user;
  }

  console.log(users, "users");


  /*used to access an inner array */

  // const usersArrays = userdata.map(item => item);
  // console.log(usersArrays, "users");


  /*used to setroomname*/

  useEffect(() => {
    const data = receivedData?.roomName;
    if (data) {
      setroomname(data);
    }
  }, [receivedData]);


  /*Logging roomname for verification*/

  console.log(roomname);


  /*Logging userdata for verification*/

  console.log(userdata, "userdata");


  /*used to set user type */

  useEffect(() => {
    const storedType = window.localStorage.getItem('usertype');
    if (storedType === "faculty") {
      setfaculty(storedType);
    }
    else {
      setstudent(storedType);
    }
  }, []);


  /*Used to retrive token from localStorage*/

  useEffect(() => {
    const savedtoken = window.localStorage.getItem('token');
    settoken(savedtoken);
  }, []);


  // useEffect(() => {
  //   const check = [{ subname: "Tamil", subdis: "This is a testing homework about the Tamil subject" }, {
  //     subname: "English", subdis: "This is a testing homework about the English subject"
  //   }];
  //   setsubject(check);
  // }, []);

  console.log(subject, "subject");

  /*Api POST for homework post by faculty*/

  const handleSubmit = (e) => {

    console.log(subname, subdis, upload);

    e.preventDefault();
    fetch("https://435de11b-0111-4742-b1ff-6024437904a3.e1-us-east-azure.choreoapps.dev/homeworkpost", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        subname,
        subdis,
        upload,
        roomname,
        token
      }),
    })

      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setsubname(data.result.subname);
        setsubdis(data.result.subdis);
        setupload(data.result.upload);
        alert(data.message);
        setposted("true");
      });
    setsubname('');
    setsubdis('');
    setupload('');
  };

  /*code to Send Homework to students*/

  const SendHomeWork = () => {
    console.log(roomname, "user check");
    console.log(token, "user check");

    fetch("https://435de11b-0111-4742-b1ff-6024437904a3.e1-us-east-azure.choreoapps.dev/Whatsapp", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token,
        roomname
      }),
    })

      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      });

  }

  /*code to fetch previous posted homework for faculty*/
  const post = () => {

    fetch("https://435de11b-0111-4742-b1ff-6024437904a3.e1-us-east-azure.choreoapps.dev/facultyhomework", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token,
        roomname,
        usertype
      }),
    })

      .then((res) => res.json())
      .then((data) => {
        console.log(data.result, "check");
        console.log(data.message);
        setsubject(data.result);
      });

  }



  /*code to fetch homework for student*/

  const studentwork = () => {

    fetch("https://435de11b-0111-4742-b1ff-6024437904a3.e1-us-east-azure.choreoapps.dev/totalhomework", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        roomname,
        token
      }),
    })

      .then((res) => res.json())
      .then((data) => {
        console.log(data, "subject");
        setsubject(data.result);
      });

  }

  /*Code to upload file and send to data server via api*/

  const [file, setfile] = useState(null);
  const [homework_id, sethomework_id] = useState('');

  const handleFileChange = (event, a) => {
    const selectedFile = event.target.files[0];
    setfile(selectedFile);
    sethomework_id(a);
  };


  const handleFileUpload = useCallback(() => {
    if (file) {
      // const file = selectedFile;
      // new FormData();
      // file.append('file', selectedFile);
      // console.log(file);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('token', token);
      formData.append('homework_id', homework_id);
      console.log(homework_id, file, token);

      /*Checking wheather the parameters aligned correcly*/

      fetch('https://435de11b-0111-4742-b1ff-6024437904a3.e1-us-east-azure.choreoapps.dev/studentupload', {
        method: 'POST',
        body: formData,
      })

        .then((res) => res.json())
        .then((data) => {
          console.log(data, "upload");
          alert(data.message);
          setfile(null);
          sethomework_id('');
        });


    }
  }, [file, homework_id,token]);

  // useEffect(() => {
  //   handleFileUpload();
  // }, [file, homework_id]);

  /*code to view previous posted homework by student to  faculty*/

  const navigate = useNavigate();

  const view = (a, b, c) => {
    const hwork = a;
    const subname = b;
    const subdis = c;
    console.log(hwork);
    navigate('/dashboard/homework/hwview', { state: { data: hwork, name: subname, dis: subdis } });
  }


  if (loading) {
    return <LoadingSpinner />;
  }
  else {

    return (
      <div className="background">

        {/*Header component*/}
        <div><Header /></div>

        <div className="container">{roomname}</div>

        <div className="app-container">

          {/* render roomname from userdata array received from sender component in left nav bar*/}
          <div className="nav-bar">
            {userdata && userdata.map((item, index) => (
              <ul key={index}>
                <li><button className="button-label" onClick={() => room(item.roomname, item.users)}>{item.roomname}</button></li>
              </ul>

            ))}
          </div>

          {/* Middle div for scrolling homework */}
          <div className="scrollable-div">
            <div>

              {/* If user=faculty post form render */}
              {faculty ? (
                <div className="homework-container">

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline w-100">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Subject"
                        value={subname}
                        onChange={(e) => setsubname(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-outline w-100">
                      <textarea
                        className="form-control"
                        type="text"
                        rows="3"
                        placeholder="Description"
                        value={subdis}
                        onChange={(e) => setsubdis(e.target.value)}
                        required
                      />
                    </div>

                    <div className="Post">
                      <label>Any document to upload</label>

                      <input
                        className="radio"
                        name="upload"
                        type="radio"
                        value="true"
                        onChange={(e) => setupload(e.target.value)}
                        required
                      />

                      <lable>Yes</lable>
                      <input
                        className="radio"
                        name="upload"
                        type="radio"
                        value="false"
                        onChange={(e) => setupload(e.target.value)}
                        required
                      />

                      <lable>No</lable>
                    </div>

                    <div className="Post">
                      <Button variant="contained" type="submit" >Post</Button>
                    </div>

                    <div className="Post">
                      <Button variant="contained" onClick={() => SendHomeWork()} >Send Homework</Button>
                    </div>

                  </form>


                  {/* Code to display homework just for faculty reference */}

                  {posted ? (
                    <div>
                      <label>This is the homework You have posted</label>
                      <div>
                        <div className="name-dis">
                          <div className="subname">{subname}</div>
                          <div className="subdis ">{subdis}</div>
                        </div>
                      </div>
                    </div>) : (null)
                  }


                  {/* Code for faculty to view their previous posted works */}
                  <div className="Post">
                    <Button variant="contained" onClick={() => post()}>Previous posted</Button>
                  </div>
                  {subject && subject.map((item, index) => (
                    <div key={index} className="name-dis">
                      <div className="subname">{item.subname}</div>
                      <div className="subdis ">{item.subdis}</div>
                      <div className="sub-date">{item.createdAt}</div>
                      <div>
                        {item.upload === true &&
                          <button onClick={() => view(item.hworks, item.subname, item.subdis)}>view</button>}
                      </div>

                    </div>
                  ))}

                </div>
              ) : (
                null
              )}
            </div>

            {/* Render subjectvise homework for student from server */}
            {student ?
              (<div>
                <button className="student-hw-btn" onClick={() => studentwork()}>My works</button>
                {subject.map((item, index) => (
                  <div key={index} className="name-dis">
                    <div className="subname">{item.subname}</div>
                    <div className="subdis ">{item.subdis}</div>
                    <div>
                      {item.upload === true &&
                        <div>
                          <input type="file" name="file" id="file" className="inputfile" accept=".pdf, .doc, .docx" onChange={(event) => handleFileChange(event, item._id)} />

                          <button onClick={() => handleFileUpload(item._id)}>Upload</button>
                        </div>
                      }
                    </div>
                    <div className="sub-date">{item.createdAt}</div>
                  </div>
                ))}
              </div>)
              :
              (null)

            }



          </div>


          {/* render username from userdata array in right nav bar*/}
          <div className="right-list">
            {users && users.map((item, index) => (
              <ul key={index}>
                <li><label>{item.name}</label></li>
              </ul>

            ))}
          </div>
        </div>
      </div>
    );
  }
}
