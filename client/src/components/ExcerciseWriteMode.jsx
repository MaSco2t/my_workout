import {useState, useEffect} from "react"
import "../styles/excerciseWriteMode.css"

function ExcerciseWriteMode(props){

        const [name, setName] = useState(props.excercise.excerciseName);
        const [sets, setSets] = useState(props.excercise.excerciseSets);
        const [reps, setReps] = useState(props.excercise.excerciseReps);
        const [time, setTime] = useState(props.excercise.excerciseTime);
        const [weight, setWeight] = useState(props.excercise.excerciseWeight);

        useEffect(()=>{
            modifyExcercises();
        }, [name, sets, reps, time, weight]);

        function modifyExcercises(){
            const excercise = {userID:props.excercise.userId, workoutNumber:props.excercise.workoutNumber, excerciseNumber:props.excercise.excerciseNumber, name, sets, reps, time, weight};
            props.createEditedWorkout(excercise);
        }

    return(
            <div className="excercise-editing">
                <h3>Excercise #{props.excercise.excerciseNumber}: <input type="text" placeholder={props.excercise.excerciseName} onChange={(e)=>{setName(e.target.value); modifyExcercises()}} value={name}/></h3>
                <p>Sets <input max="1000" type="number" placeholder={props.excercise.excerciseSets} onChange={(e)=>{setSets(e.target.value);}} value={sets}/></p>
                {time==null && <p>Reps <input max="1000" type="number" placeholder={props.excercise.excerciseReps} onChange={async (e)=>{setReps(e.target.value); modifyExcercises()}} value={reps}/></p>}
                {reps==null && <p>Time <input max="1000" type="number" placeholder={props.excercise.excerciseTime} onChange={async (e)=>{setTime(e.target.value); modifyExcercises()}} value={time}/></p>}
                <p className="dark">Weight(lbs.) <input max="1000" type="number" placeholder={props.excercise.excerciseWeight} onChange={async (e)=>{setWeight(e.target.value); modifyExcercises()}} value={weight}/></p>
            </div>
    )
}
export default ExcerciseWriteMode;