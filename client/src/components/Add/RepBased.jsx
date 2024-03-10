import {useState} from "react"
import "../../styles/add/repBased.css"

function RepBased(props){

    const [name, setName] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [complaint, setComplaint] = useState("");

    function submit(e){
        e.preventDefault();
        if(name!="" && sets!="" && reps!="" && weight!=""){
            props.addRepsExcercise(name,sets,reps,weight);
            setComplaint("");
        }else{
            setComplaint("You must fill out all fields before adding an excercise.");
        }
        
    }

    return(
        <form className="repBased" action="">
            <div>
                <p>Excercise Name</p>
                <input maxLength="30" type="text" placeholder="name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
            </div>
            <div>
               <p>Sets</p>
                <input max="1000" type="number" placeholder="count" onChange={(e)=>{setSets(e.target.value)}} value={sets}/>
            </div>
            <div>
               <p>Reps</p>
                <input max="1000" type="number" placeholder="count" onChange={(e)=>{setReps(e.target.value)}} value={reps}/>
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
export default RepBased;