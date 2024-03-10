import RepBased from "./RepBased.jsx"
import TimeBased from "./TimeBased.jsx"
import "../../styles/add/add.css"
import {useState} from 'react'
import axios from 'axios'

function Add(props){

    const [count, setCount] = useState(0);
    const [excercises, setExcercises] = useState([]);
    const [complaint, setComplaint] = useState("");
    const [type, setType] = useState("repBased");

    function addRepsExcercise(name, sets, reps, weight){
        const number = count+1;
        setCount(count+1);
        setExcercises([...excercises, {number,name,sets,reps,time:null,weight}]);
    }

    function addTimeExcercise(name, sets, time, weight){
        const number = count+1;
        setCount(count+1);
        setExcercises([...excercises, {number,name,sets,reps:null,time,weight}]);
    }

    function deleteExcercise(num){
        console.log("called");
        console.log(num);
        var tmp = excercises.filter((excercise)=>excercise.number!=num);
        console.log(tmp);
        for(var i=0;i<tmp.length;i++){
            if(tmp[i].number>num){
                --tmp[i].number;
            }
        }
        setCount(count-1);  
        setExcercises(tmp);
    }

    function submit(e){
        if(count==0){
            setComplaint("Please add at least one excercise before submitting your workout.");
            return;
        }
        e.preventDefault();
        axios.post("http://localhost:3000/workouts", {excercises:excercises, info:props.userInfo})
        .then((result)=>{
            if(result[0] = "ok"){
               console.log("Yay")
               props.setActive(1);
            }else{
                console.log(result[0]);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div className="add">
            <div className="addExcercises">
                <h1>Add Excercise</h1>
                <div className="options">
                    <p>Type</p>
                    <button className="rep-based" onClick={()=>setType("repBased")}>Rep-based</button>
                    <button className="time-based" onClick={()=>setType("timeBased")}>Time-based</button>
                </div>
                <div>
                    {type=="repBased" && <RepBased addRepsExcercise={addRepsExcercise}/>}
                    {type=="timeBased" && <TimeBased addTimeExcercise={addTimeExcercise}/>}
                </div>
            </div>
            <div className="workoutDisplay">
                    <div>
                        <h1>Workout Preview</h1>
                    </div>
                    <div className="excercises">
                        {excercises.map((excercise)=>{
                            return(
                                <div className="excercise">
                                        <p>Excercise {excercise.number}: {excercise.name}</p>
                                        <p>Sets {excercise.sets}</p>  
                                    {type=="repBased" &&  <p>Reps: {excercise.reps}</p>}
                                    {type=="timeBased" && <p>Time: {excercise.time}</p>}  
                                    <p>Weight: {excercise.weight}lbs</p>  
                                    <button className="deleteExcercise" onClick={() => { deleteExcercise(excercise.number)}}>Delete</button>
                                </div>
                            );
                        })}
                        <button onClick={submit}>Save Workout</button>
                        <p className="complaint">{complaint}</p>
                    </div>

            </div>     
        </div>
    );
}
export default Add;