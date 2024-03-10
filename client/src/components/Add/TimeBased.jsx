import {useState} from "react"
import "../../styles/add/timeBased.css"

function TimeBased(props){

    const [name, setName] = useState("");
    const [sets, setSets] = useState("");
    const [time, setTime] = useState("");
    const [weight, setWeight] = useState("");
    const [complaint, setComplaint] = useState("");

    function submit(e){
        e.preventDefault();
        if(name!="" && sets!="" && time!="" && weight!=""){
            props.addTimeExcercise(name,sets,time,weight);
            setComplaint("");
        }else{
            setComplaint("You must fill out all fields before adding an excercise.");
        }
        
    }

    return(
        <form className="timeBased" action="">
            <div>
                <p>Excercise Name</p>
                <input maxLength="30" type="text" placeholder="name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
            </div>
            <div>
               <p>Sets</p>
                <input max="1000" type="number" placeholder="count" onChange={(e)=>{setSets(e.target.value)}} value={sets}/>
            </div>
            <div>
               <p>Time(sec.)</p>
                <input max="1000" type="number" placeholder="count" onChange={(e)=>{setTime(e.target.value)}} value={time}/>
            </div>
            <div>
                    <p>Weight(lbs.)</p>
                    <input className="num" max="1000" type="number" placeholder="count" onChange={(e)=>{setWeight(e.target.value)}} value={weight}/>
            </div>
            <div className="submit" onClick={submit}>
                    <button>Add</button>
             </div>
             <p className="complaint">{complaint}</p>
        </form>
    );

}
export default TimeBased;