import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Header from '../header';
import Button from 'react-bootstrap/Button';
import { MDBSwitch } from 'mdb-react-ui-kit';

export default function Hwview() {
    const location = useLocation();
    const hwork = location.state?.data;
    const subname = location.state?.name;
    const subdis = location.state?.dis;
    const [checked] = useState(false);
    const [token, settoken] = useState('')
    const [user_id, setuserid] = useState('')

    console.log(hwork, "work");
    console.log(checked);

    useEffect(() => {
        const storedToken = window.localStorage.getItem('token');
        if (storedToken) {
          settoken(storedToken);
        }
      }, []);

    const openFile=(file)=>{
        window.open(`https://435de11b-0111-4742-b1ff-6024437904a3.e1-us-east-azure.choreoapps.dev/files/${file}`);

    }

    useEffect(()=>{
        setuserid(hwork.user);
    },[hwork.user])

    console.log(user_id,"userid");

    function hwchecked() {
    
        fetch("https://435de11b-0111-4742-b1ff-6024437904a3.e1-us-east-azure.choreoapps.dev/homeworkupdate", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            user_id,
            token
          }),
        })
    
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            
          });
      }
      
    return (
        <div className="background">
            <div>
                <Header />
            </div>
            <div className="hw">
            <label>Homework</label>
            <div className="hwtitle"><label>Title :</label>{subname}</div>
            <div className="hwdis "><label>Discription:</label>{subdis}</div>
            </div>
            <div className="tablefull">
                <div className="row">
                    <div className="user" >
                        <label className="heading">users</label>
                    </div>
                    <div className="work">
                        <label className="heading">Document</label>
                    </div>
                    <div className="view">
                        <label className="heading">To view</label>
                    </div>
                    <div className="Checked">
                        {/* <label className="heading">Checked</label> */}
                    </div>
                </div>
                {hwork && hwork.map((item, index) => (
                    <div className="table">
                        <div className="row" key={index}>
                            <div className="user">
                                {item.user}
                            </div>
                            <div className="work">
                                {item.work}
                            </div>
                            <div className="view">
                                <Button variant="info" onClick={()=>openFile(item.work)}>View Doc</Button>
                            </div>
                            <div className="checked">
                            <MDBSwitch id='flexSwitchCheckDefault' onClick={()=>hwchecked()} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}