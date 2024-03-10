function ExcerciseReadMode(props){
    return(
        <div>
            <h3>Excercise #{props.excercise.excerciseNumber}: {props.excercise.excerciseName}</h3>
            <p>Sets: {props.excercise.excerciseSets}</p>
            {props.excercise.excerciseReps && <p>Reps: {props.excercise.excerciseReps}</p>}
            {props.excercise.excerciseTime && <p>Time: {props.excercise.excerciseTime} seconds</p> }
            <p>Weight: {props.excercise.excerciseWeight}lbs.</p>
        </div>
    )
}
export default ExcerciseReadMode;