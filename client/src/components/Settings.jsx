import "../styles/settings.css"
import {useState} from "react"
import axios from "axios"

//Yes I know this component has a lot of redundancy... please forgive me.

function Settings(props){
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [newName, setNewName] = useState("");
    const [errUser, setErrUser] = useState("");

    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [newPass, setNewPass] = useState("");
    const [errPass, setErrPass] = useState("");

    function submitUsernameChange(){
        if(name1!=name2){
            setErrUser("The two usernames do not match");
            return;
        }
        if(name1!=props.userInfo.username){
            setErrUser("One or more of your old username entries is incorrect");
            return;
        }
        setErrUser("");
        axios.post("http://localhost:3000/users/new_username", {userID:props.userInfo.userID, username:newName})
        .then(result=>{
            if(result.data[0]=="ok"){
                alert("success");
                location.reload();
            }else{
                setErrUser(result.data[0]);
            }
        })
        .catch(err=>console.log(err));
    }

    function submitPasswordChange(){
        if(pass1!=pass2){
            setErrPass("The two passwords do not match");
            return;
        }
        if(pass1!=props.userInfo.password){
            setErrPass("One or more of your old password entries is incorrect");
            return;
        }
        axios.post("http://localhost:3000/users/new_password", {userID:props.userInfo.userID, password:newPass})
        .then(result=>{
            if(result.data[0]=="ok"){
                alert("success");
                location.reload();
            }else{
                setErrUser(result.data[0]);
            }
        })
        .catch(err=>console.log(err))
    }

    return(
        <div className="settings">
            <div>
                <h3>Change Username</h3>
                <p>Old username &nbsp;<input type="text" value={name1} onChange={(e)=>{setName1(e.target.value)}}/></p>
                <p>Re-type old username &nbsp;<input className="clipped input" type="text" value={name2} onChange={(e)=>{setName2(e.target.value)}}/></p>
                <p>New username &nbsp;<input type="text" value={newName} onChange={(e)=>{setNewName(e.target.value)}}/></p>
                <p className="err">{errUser}</p>
                <button className="submit" onClick={submitUsernameChange}>Submit</button>
            </div>
            <div>
                <h3>Change Password</h3>
                <p>Old password &nbsp;<input type="text" value={pass1} onChange={(e)=>{setPass1(e.target.value)}}/></p>
                <p>Re-type old password &nbsp;<input type="text" value={pass2} onChange={(e)=>{setPass2(e.target.value)}}/></p>
                <p>New Password &nbsp;<input type="password" value={newPass} onChange={(e)=>{setNewPass(e.target.value)}}/></p>
                <p className="err">{errPass}</p>
                <button className="submit" onClick={submitPasswordChange}>Submit</button>
            </div>
            <button className="back">Back</button>
        </div>
    )
}
export default Settings;