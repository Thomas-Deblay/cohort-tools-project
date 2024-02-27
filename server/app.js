const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = 5005;
const mongoose = require('mongoose');
const Student = require('./data/Students.model')
const Cohort = require('./data/Cohorts.model')


mongoose
.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
.then(x =>{ console.log(`Connected to Database: "${x.connections[0].name}"`)})
.catch(err => console.error("Error connecting to MongoDB", err));


// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const students = require('./students.json');
const cohorts = require('./cohorts.json');

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors({origin: ['http://localhost:5173'],}))
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// access to any client
// app.use(cors());

//access to specific clients



// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get('/docs', (req, res) => {
  res.sendFile(__dirname + '/views/docs.html');
});

// app.get('/api/students', (req, res, next) => {
//   res.json(students);
// });

// app.get('/api/cohorts', (req, res, next) => {
//   res.json(cohorts);
// });

//from database
app.get('/api/students', (req, res, next) => {
  Student.find({})
  .then((students) => {
    console.log("Retrieved students ->", students);
    res.json(students);
  })
  .catch((error) => {
    console.error("Error while retrieving students ->", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  });
 
});

app.get('/api/cohorts', (req, res, next) => {
  Cohort.find({})
  .then((cohorts) => {
    console.log("Retrieved Cohorts ->", cohorts);
    res.json(cohorts);
  })
  .catch((error) => {
    console.error("Error while retrieving Cohorts ->", error);
    res.status(500).json({ error: "Failed to retrieve cohorts" });
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


