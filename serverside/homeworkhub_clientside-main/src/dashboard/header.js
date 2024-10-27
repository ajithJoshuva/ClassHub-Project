import React, {  useEffect, useState } from 'react';
import './dashboard.css';



function Header() {

  const [username, setusername] = useState("");
  const [usertype, setusertype] = useState("");


  useEffect(() => {
    const storedName = window.localStorage.getItem('username');
    if (storedName) {
      setusername(storedName);
    }
  }, []);
  useEffect(() => {
    const storedType = window.localStorage.getItem('usertype');
    if (storedType) {
      setusertype(storedType);
    }
  }, []);

  const logout=()=>{
    window.localStorage.clear();
    window.location.href = "/home";
  }



  const [photoUrl] = useState('https://cdn-icons-png.flaticon.com/512/9131/9131529.png');

  // useEffect(() => {
  //   // Fetch photo from the database
  //   const fetchPhoto = async () => {

  //     try {
  //       // const response = "D:/_Bala_project/login-registration-main/src/assets/profile_bg.jpg";
  //       // setPhotoUrl(response);

  //       const response = await axios.get('your_database_api_endpoint');
  //       // Assuming your API returns a JSON object with a 'photoUrl' property
  //       setPhotoUrl(response.data.photoUrl);
  //     } catch (error) {
  //       console.error('Error fetching photo:', error);
  //     }
  //   };

  //   fetchPhoto(); // Call the fetch function when the component mounts
  // }, []);



  return (
    <div >
      <header className='header'>
        <div>
          {usertype === 'faculty' ?
            (
              <nav className="storke">
                <ul>
                  <li className="homelink"><a href="/home">Home</a></li>
                  <li className="homelink"><a href="/dashboard">Dashbboard</a></li>
                  <li className="homelink"><a href="/dashboard/createroom">Create Room</a></li>
                  <li className="homelink"><a href="/dashboard/joinroom">Join Room</a></li>
                  <li className="homelink"><a href="/dashboard/myroom">My room</a></li>
                </ul>
              </nav>
            )
            :
            (
              <nav className="storke">
                <ul>
                  <li className="homelink"><a href="/home">Home</a></li>
                  <li className="homelink"><a href="/dashboard">Dashbboard</a></li>
                  <li className="homelink"><a href="/dashboard/joinroom">Join Room</a></li>
                  <li className="homelink"><a href="/dashboard/myroom">My room</a></li>
                </ul>
              </nav>
            )}
        </div>
        <div className="round-photo-frame">
          {/* Display the fetched photo */}

        </div>
        <div className="user-details">
          <img src={photoUrl} alt="User" />

           <div>
            <p className="username">{username}</p>
          
            <p className="usertype">{usertype}</p>
            
          </div>
          <button className='btn logout' onClick={logout}>Logout</button>
         
          
        </div>
      </header>

      {/* <body className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
                
                {/* <img  src="D:\_Bala_project\login-registration-main\src\BG-image.jpg" alt="Description of the image" width="100" height="100"></img> 
                
                </body> */}
    </div>
  );
}



export default Header;
