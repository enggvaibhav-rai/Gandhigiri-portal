const express = require("express");
const app = express();
const mysql = require('mysql2');

let port = 3000;

const path  = require("path");
const methodOverride = require("method-override"); //npm i method-override

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'GANDHIGIRI',
    password: 'zxl729@#'
});
//npm i ejs
app.set("view engine", "ejs");
app.use(methodOverride("_method")); 
app.set("views", path.join(__dirname, "views")); // to access from outside of folder by path
app.use(express.static(path.join(__dirname, "public"))); // to use html, css, js file togrther
app.use(express.urlencoded({extended: true})); // parse post request data
app.use(express.json()); // to handle json data

app.set("view engine", "ejs");
app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.get("/register", (req, res)=>{
    res.render("registration.ejs");
});

app.get("/about", (req, res)=>{
    res.render("about.ejs");
});

app.post("/register", (req, res) => {
    const { name, roll_no, college_email_id, phone_no, project_name, team_member_name, team_leader_name, project_field, course, specialization } = req.body;

    // SQL Query with placeholders for data insertion
    let q = "INSERT INTO student_registration(`name`, `roll_no`, `college_email_id`, `phone_no`, `project_name`, `team_member_name`, `team_leader_name`, `project_field`, `course`, `specialization`) VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?, ?)";
 
    // Array of values to insert
    let arr = [name, roll_no, college_email_id, phone_no, project_name, team_member_name, team_leader_name, project_field, course, specialization];

    // Execute query
    connection.query(q, arr, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Failed to register user');
        }
        console.log('User registered successfully:', result);
        res.render('index.ejs');
    });
});

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
});

