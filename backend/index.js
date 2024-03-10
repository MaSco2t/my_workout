import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";

const app = express();
dotenv.config();


var db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect((err)=>{
    if(err){
        console.log(err); 
    }
})


app.use(function(req,res,next){
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use(express.json());

app.options('/*', (_, res) => {
    res.sendStatus(200);
});


app.get("/",(req,res)=>{
    res.send();
});

app.post("/users/signup",(req,res)=>{
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    if(username=="" || password==""){
        res.send(["Username and password must both be at least 1 character"])
    }else{
        db.query("SELECT * from users WHERE username=?", [username], (err,result)=>{
            if(err){
                console.log(err);
            }
            if(result.length!=0){
                res.send(["This username already exists, please try a different one"]);
            }else{
                db.query("INSERT INTO users (username, passwrd) VALUES (?,?)", [username, password], (err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    console.log(result);
                    db.query("SELECT * from users WHERE (username=? AND passwrd=?)", [username, password], (err,result)=>{
                        if(err){
                            console.log(err);
                        }
                        res.send(["ok", result[0]]);
                    } );
                });
            }
        });
    }
});

app.post("/users/login",(req,res)=>{
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    db.query("SELECT * from users WHERE (username=? AND passwrd=?)", [username, password], (err,result)=>{
        if(err){
            console.log(err);
        }
        if(result.length!=0){
            console.log(result[0]);
            res.send(["ok", result[0]]);
        }else{
            res.send(["Incorrect Credentials. Please try again."]);
        }
    } );
});

app.post("/users/new_username",(req,res)=>{
    const userID = req.body.userID
    const username = req.body.username;
    console.log("got");
    if(username==""){
        res.send(["Username must not be blank"]);
    }else{
        db.query("SELECT * from users WHERE username=?", [username], (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
                if(result.length!=0){
                    console.log("got");
                    res.send(["Username already exists"]);
                }else{
                    db.query("Update users Set username = ? where userID = ?", [username, userID], (err,result)=>{
                        if(err){
                           console.log(err);
                        }else{
                            console.log("got");
                            res.send(["ok"]);
                        }
                    })
                }
            }
        })
    }
});

app.post("/users/new_password",(req,res)=>{
    const userID = req.body.userID
    const password = req.body.password;
    console.log("got");
    if(password==""){
        res.send(["Password must not be blank"]);
    }else{
        db.query("SELECT * from users WHERE passwrd=?", [password], (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
                if(result.length!=0){
                    console.log("got");
                    res.send(["Password already exists"]);
                }else{
                    db.query("Update users Set passwrd = ? where userID = ?", [password, userID], (err,result)=>{
                        if(err){
                           console.log(err);
                        }else{
                            console.log("got");
                            res.send(["ok"]);
                        }
                    })
                }
            }
        })
    }
});

app.get("/workouts/count/:id", (req,res)=>{
    const userID = req.params.id;
    console.log(userID);
    db.query("SELECT MAX(workoutNumber) as max from excercises where userID = ?", [userID], (err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result);
        const maxWorkoutNumber = result[0].max;
        res.send([maxWorkoutNumber]);
    });
});

app.get("/workouts/:id/:workoutNumber", (req,res)=>{
    console.log("got me");
    const userID = req.params.id;
    const workoutNumber = req.params.workoutNumber;    
    console.log(userID);
    console.log(workoutNumber);
    db.query("SELECT * from excercises where userID = ? AND workoutNumber = ?", [userID, workoutNumber], (err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result);
        res.send(result);
    });
});

app.post("/workouts",(req,res)=>{
    const excercises = req.body.excercises;
    const userID = req.body.info.userID;

    db.query("Select workoutCount from users where userID = ?",[userID], (err,result)=>{
        if(err){
            console.log(err);
        }else{
            var workoutNumber = result[0].workoutCount+1; 
            for(var i=0; i<excercises.length;i++){
                const {number, name, sets, reps, time, weight} = excercises[i];
                var error = false;
                var excercises_added = 0;
                db.query("INSERT INTO excercises (userID, workoutNumber, excerciseNumber, excerciseName, excerciseSets, excerciseReps, excerciseTime, excerciseWeight) VALUES (?,?,?,?,?,?,?,?)", [userID, workoutNumber, number, name, sets, reps, time, weight], (err,result)=>{
                    if(err){
                        console.log(err);
                        error = true;
                    }
                    excercises_added++;
                    if(excercises_added==excercises.length){
                        if(!error){
                            console.log(workoutNumber);
                            console.log(userID);
                            db.query("UPDATE users SET workoutCount = ? WHERE userID = ? ", [(workoutNumber), userID],(err,result)=>{
                                if(err){
                                    console.log(err);
                                    res.send(["Error"]);
                                }else{
                                    console.log("done");
                                    res.send(["ok", workoutNumber]);
                                }
                            })
                        }else{
                            res.send(["error"]);
                        }
                    }
                })
            }
        }
    })
});

app.post("/workouts/:workoutNumber",(req,res)=>{
    const workoutNumber = req.params.workoutNumber;
    const newWorkout = req.body.newWorkout;
    var update_count = 0;
    console.log("hey");
    console.log(newWorkout);
    for(var i=0; i<newWorkout.length;i++){
        console.log(newWorkout[i]);
        const {userID, workoutNumber, excerciseNumber, name, sets, reps, time, weight} = newWorkout[i];
        db.query("Update excercises SET excerciseName = ?, excerciseSets = ?, excerciseReps = ?, excerciseTime = ?, excerciseWeight = ? WHERE userID = ? AND workoutNumber = ? AND excerciseNumber = ?", [name,sets,reps,time,weight,userID,workoutNumber,excerciseNumber],(err,result)=>{
            if(err){
                console.log(err);
                res.send(["error"]);
            }else{
                update_count++;
                if(update_count==newWorkout.length-1){
                    res.send("success");
                }
            }
        });
    }
});

app.delete("/workouts/:userID/:workoutNumber",(req,res)=>{
    const userID = req.params.userID;
    const workoutNumber = req.params.workoutNumber;
    console.log("this is");
    console.log(workoutNumber);
    console.log(userID);
    db.query("DELETE from excercises where userID = ? AND workoutNumber = ?", [userID, workoutNumber], (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            db.query("UPDATE excercises SET workoutNumber = workoutNumber - 1 where userId = ? AND workoutNumber > ?", [userID, workoutNumber], (err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    db.query("UPDATE users SET workoutCount = workoutCount - 1 where userId = ?", [userID], (err,result)=>{
                        if(err){
                            console.log(err);
                        }else{
                            res.send(["delete"]);
                        }
                    })
                }
            })
        }
    });
});

app.listen(3000);
