const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = 5005;
const mongoose = require('mongoose');
const Student = require('./data/Students.model');
const Cohort = require('./data/Cohorts.model');
const { errorHandler, notFoundHandler} = require('./middleware/error-handling')

mongoose
  .connect('mongodb://127.0.0.1:27017/cohort-tools-api')
  .then((x) => {
    console.log(`Connected to Database: "${x.connections[0].name}"`);
  })
  .catch((err) => console.error('Error connecting to MongoDB', err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// const students = require('./students.json');
// const cohorts = require('./cohorts.json');

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors({ origin: ['http://localhost:5173'] }));
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

// STUDENTS ROUTES =====================
app.get('/api/students', (req, res, next) => {
  Student.find({})
  .populate('cohort')
    .then((students) => {
      console.log('Retrieved students ->', students);
      res.json(students);
    })
    .catch((error) => {
     next(error)
    });
});

// RETRIEVE ALL THE STUDENTS FROM A COHORT / GET -----
app.get('/api/students/cohort/:id', (req, res, next) => {
  const { id } = req.params;
  Student.find({ cohort: id })
  .populate('cohort')
    .then((students) => {
      console.log('Retrieved students ->', students);
      res.json(students);
    })
    .catch((error) => {
     next(error);
    });
});
// end ---

// GET A SPECIFIC BY ID / GET-------
app.get('/api/students/:id', (req, res,next) => {
  const { id } = req.params;
  Student.findById(id)
  .populate('cohort')
    .then((studentFromDB) => {
      res.status(200).json(studentFromDB);
    })
    .catch((e) => {
      next(e);
    });
});
// end ---

// CREATE A NEW / POST------
app.post('/api/students', (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    projects,
    cohort,
  } = req.body;
  console.log(req.body);
  Student.create({
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    projects,
    cohort,
  })
    .then((studentsFromDB) => {
      res.status(201).json(studentsFromDB);
    })
    .catch((e) => {
      next(e);
    });
});
// end ---

// UPDATE BY ID / PUT--------
app.put('/api/students/:id', (req, res,next) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    projects,
    cohort,
  } = req.body;
  Student.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      projects,
      cohort,
    },
    { new: true }
  )
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((e) => {
      next(e)
    });
});
// end ----

// DELETE BY ID / DELETE ----
app.delete('/api/students/:id', (req, res,next) => {
  const { id } = req.params;
  Student.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((e) => {
      next(e)
    });
});
// end ---

// END ========

// COHORTS ROUTES ==========================
app.get('/api/cohorts', (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log('Retrieved Cohorts ->', cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
     next(e)
    });
});

// GET A SPECIFIC BY ID / GET-------
app.get('/api/cohorts/:id', (req, res,next) => {
  const { id } = req.params;
  Cohort.findById(id)
    .then((cohortFromDB) => {
      res.status(200).json(cohortFromDB);
    })
    .catch((e) => {
     next(e)
    });
});
// end ---

// CREATE A NEW / POST------
app.post('/api/cohorts', (req, res, next) => {
  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDat,
    endDate,
    programManager,
    leadTeacher,
    totalHour,
  } = req.body;
  console.log(req.body);
  Cohort.create({
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDat,
    endDate,
    programManager,
    leadTeacher,
    totalHour,
  })
    .then((cohortsFromDB) => {
      res.status(201).json(cohortsFromDB);
    })
    .catch((e) => {
      next(e)
    });
});
// end ---

// UPDATE BY ID / PUT--------
app.put('/api/cohorts/:id', (req, res,next) => {
  const { id } = req.params;
  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDat,
    endDate,
    programManager,
    leadTeacher,
    totalHour,
  } = req.body;
  Cohort.findByIdAndUpdate(
    id,
    {
      inProgress,
      cohortSlug,
      cohortName,
      program,
      campus,
      startDat,
      endDate,
      programManager,
      leadTeacher,
      totalHour,
    },
    { new: true }
  )
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((e) => {
     next(e)
    });
});
// end ----

// DELETE BY ID / DELETE ----
app.delete('/api/cohorts/:id', (req, res,next) => {
  const { id } = req.params;
  Cohort.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((e) => {
      next(e)
    });
});
// end ---

// END ======
app.use(errorHandler);
app.use(notFoundHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
