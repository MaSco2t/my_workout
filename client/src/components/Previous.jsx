import {useState, useEffect} from 'react'
import axios from 'axios'
import "../styles/previous.css"
import ExcerciseReadMode from "./ExcerciseReadMode.jsx"
import ExcerciseWriteMode from "./ExcerciseWriteMode.jsx"

function Previous(props){
    const [noWorkouts, setNoWorkouts] = useState(false);
    const [dataReceived, setDataReceived] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [editModeWorkout, setEditModeWorkout] = useState(0);
    const userID = props.userID;
    const [newWorkout, setNewWorkout] = useState([]);

    function createEditedWorkout(excercise){
        var tmp = newWorkout;
        tmp[(excercise.excerciseNumber)-1] = excercise;
        setNewWorkout(tmp);
    }

    function submitEditedWorkout(){
        var workoutNumber = newWorkout[0].workoutNumber;
        axios.post("http://localhost:3000/workouts/" + workoutNumber, {newWorkout})
        .then((result)=>{
            console.log("workout updated");
            props.setActive(3);
        })
        .catch((err)=>console.log(err))
    }

    function deleteWorkout(num){
        console.log("delete bruh");
        axios.delete("http://localhost:3000/workouts" +`/${userID}/${num}`, )
        .then((result)=>{
            console.log("workout deleted");
            props.setActive(3);
        })
        .catch((err)=>console.log(err))
    }

    useEffect(()=>{
        console.log('hi');
        async function get_workouts(arr, workoutCount){
            if(workoutCount==null){
                setNoWorkouts(true);
            }
            for(var i=1; i<=workoutCount;i++){
                await axios.get("http://localhost:3000/workouts/" + userID + "/" + i)
                .then(result=>{
                    arr.push(result.data);
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        }
    
        if(!dataReceived){
            axios.get("http://localhost:3000/workouts/count/" + userID)
            .then(result=>{
                var workout_list = [];
                //In JS null evaluates to 0 when used with < and > comparison operators.
                get_workouts(workout_list,result.data[0])
                .then(()=>{
                    setWorkouts(workout_list);
                    setDataReceived(true);
                })
            });
        }
    });

    return(
        <div>
            
            {dataReceived && <div className="workouts">
                {noWorkouts && <h1 className="savedWorkouts">You have no saved workouts.... Get it together!</h1>}
                {console.log(workouts)}
                {workouts.map((workout)=>{
                        const workoutNumber = workout[0].workoutNumber;
                        return(   
                             <div className="workout">
                                <div className="excercises">
                                    <h1>Workout #{workoutNumber}</h1>
                                    {workout.map(excercise=>{
                                        return(<div>
                                                    {editModeWorkout != workoutNumber && <ExcerciseReadMode excercise={excercise}/>}
                                                    {editModeWorkout == workoutNumber && <ExcerciseWriteMode excercise={excercise} createEditedWorkout={createEditedWorkout}/>}
                                                </div>)
                                    })}
                                </div>
                                <div className="options">
                                    {editModeWorkout != workoutNumber && <button className="edit" onClick={()=>{console.log("hey");console.log(workout);setNewWorkout(workout.slice(0));setEditModeWorkout(workoutNumber)}}>Edit</button>}
                                    {editModeWorkout != workoutNumber && <button className="delete" onClick={()=>deleteWorkout(workoutNumber)}>Delete</button>}
                                    {editModeWorkout == workoutNumber && <button className="back" onClick={()=>setEditModeWorkout(0)}>Back</button>}
                                    {editModeWorkout == workoutNumber && <button className="submit" onClick={()=>{console.log(newWorkout);submitEditedWorkout()}}>Submit</button>}
                                </div>
                            </div>
                        )
                })}
            </div>}

            {!dataReceived && <h1>Fetching workout data...</h1>}
        </div>
    )
};
export default Previous;