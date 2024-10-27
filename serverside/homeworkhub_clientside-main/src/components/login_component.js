import React, {  useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner';



export default function Login() {
  const [rollnum, setrollnum] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(rollnum, password);
    fetch("https://435de11b-0111-4742-b1ff-6024437904a3.e1-us-east-azure.choreoapps.dev/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        rollnum,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.success === "true") {
          alert(data.message);
          window.localStorage.setItem("token", data.result.token);
          window.localStorage.setItem("username", data.result.user.name);
          window.localStorage.setItem("rollnum", data.result.user.rollnum);
          window.localStorage.setItem("usertype", data.result.user.usertype);

          window.localStorage.setItem("loggedIn", true);
          console.log(data.result);

          navigate('/dashboard');
        }
        else {
          alert(data.message);
        }
      });
  }

  if (loading) {
    return <LoadingSpinner />;
  }
  else {

    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>

            <div className="mb-3">
              <label>Roll number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Rollnumber"
                onChange={(e) => setrollnum(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              <a href="/sign-up">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
