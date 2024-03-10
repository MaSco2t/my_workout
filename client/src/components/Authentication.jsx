import { useState } from "react";
import "../styles/authentication.css"
import axios from "axios";

function Authentication(props) {

    const [functionality, setFunctionality] = useState("Login"); 
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [inputFeedback, setInputFeedback] = useState("");

    function modifyFunctionality(){
        setUsername("");
        setPassword("");
        setInputFeedback("");
        if(functionality=="Login"){
            setFunctionality("Sign Up");
        }else{
            setFunctionality("Login");
        }
    }

    function submit(e){
        e.preventDefault();

        const credentials = {
            username: username,
            password: password
        }
        e.target.reset();

        var path_extension;
        if(functionality=="Sign Up"){
            path_extension="signup";
        }
        else{
            path_extension="login";
        }

        axios.post("http://localhost:3000/users/" + path_extension, credentials)
        .then((result)=>{
            if(result.data[0]=="ok"){
                delete result.data[1].workoutCount;
                props.logIn(result.data[1]);
            }else{
                setInputFeedback(result.data);
            }
        }).catch((err)=>{
            console.log(err);
        })
        
        
        
    }

   return(
        <div className = "authentication">
            <h1>{functionality}</h1>
                <p>Please {functionality.toLowerCase()} to access this site's features.</p>
                    <form className = "userInfo" onSubmit={submit}>
                        <div>
                            <p>Username</p>
                            <input maxLength="20" name="username" type="text" placeholder="Please enter your username" onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
                        </div>
                        <div>
                            <p>Password</p>
                            <input maxLength="20" name="password" password="username" type="password" placeholder="Please enter your password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                        </div>
                        <p className="badInput">{inputFeedback}</p>
                            <button>Submit</button>
                    </form>
                <div className="alternatives">
                    {functionality=="Login" && <p>New user? <button onClick={modifyFunctionality}>Sign up here</button></p> }
                    {functionality=="Sign Up" && <p><button onClick={modifyFunctionality}>Back to login</button></p> }
                </div>
        </div>
   );
}

export default Authentication;