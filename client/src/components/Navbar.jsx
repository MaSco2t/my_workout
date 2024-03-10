import { useState } from 'react'
import "../styles/navbar.css"
function Navbar(props){

    return(
        <nav>
            <div className = "left-items">
                <h1>My Workout</h1>
            </div>
            <div className="right-items">
                <div className={props.activeList[0]} onClick={() => props.setActive(0)}>Add Workout</div>
                <div className={props.activeList[1]} onClick={() => props.setActive(1)}>Previous Workouts</div>
                <div className={ `${props.activeList[2]} settingsNav` } onClick={() => props.setActive(2)}>Settings</div>
            </div>
        </nav>
    )
};
export default Navbar;