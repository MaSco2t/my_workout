import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar.jsx"
import Authentication from "./Authentication.jsx"
import NotFound from "./NotFound.jsx"
import Add from "./Add/Add.jsx"
import Previous from "./Previous.jsx"
import Updating from "./Updating.jsx"
import Settings from "./Settings.jsx"

import "../styles/app.css"

function App() {
  
  const [currentImage, setCurrentImage] = useState("img0");
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeList, setActiveList] = useState(["inactive", "active", "inactive", "inactive"]);
  const [userInfo, setUserInfo] = useState({
    userID:0,
    username:"",
    password:""
  });

  function setActive(num){
    var arr = ["inactive", "inactive", "inactive", "inactive"]
    arr[num] = "active";
    setActiveList(arr);
    if(loggedIn==true){
      setCurrentImage("img"+(num+1).toString());
    }
  }

  function logIn(info){
    setUserInfo({userID:info.userID, username:info.username, password:info.passwrd});
    setLoggedIn(true);
    var num = 0;
    for(var i=0;i<3;i++){
      if(activeList[i]=="active"){
        num=i;
      }
    }
    setCurrentImage("img"+(num+1).toString());
  }

  return(
    <div className={"app " + currentImage}>
      <Navbar activeList={activeList} setActive={setActive} profileMenuShowing={loggedIn == false ? "hidden":"showing"}/>
      <BrowserRouter>
        <Routes>
          
          {loggedIn && (activeList[0]=="active") && <Route path="/" element={<Add onClick={console.log(userInfo)} setActive={setActive} userInfo={userInfo} />}></Route>}
          {loggedIn && (activeList[1]=="active") && <Route path="/" element={<Previous setActive={setActive} userID={userInfo.userID}/>}></Route>}
          {loggedIn && (activeList[2]=="active") && <Route path="/" element={<Settings userInfo={userInfo}/>}></Route>}
          {loggedIn && (activeList[3]=="active") && <Route path="/" element={<Updating setActive={setActive}/>}></Route>}

          {!loggedIn && <Route path="/" element={<Authentication logIn={logIn} />}></Route>}

          <Route path="/:value" element={<NotFound></NotFound>}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
