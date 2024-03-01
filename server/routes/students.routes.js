const router = require('express').Router();
const mongoose = require('mongoose');
const Student = require('../data/Students.model');

const { isAuthenticated } = require('../middleware/jwt.middleware');

// STUDENTS ROUTES =====================
router.get('/students', (req, res, next) => {
  Student.find({})
    .populate('cohort')
    .then((students) => {
      console.log('Retrieved students ->', students);
      res.json(students);
    })
    .catch((error) => {
      next(error);
    });
});

// RETRIEVE ALL THE STUDENTS FROM A COHORT / GET -----
router.get('/students/cohort/:id', (req, res, next) => {
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
router.get('/students/:id', (req, res, next) => {
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
router.post('/students', isAuthenticated, (req, res, next) => {
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
router.put('/students/:id', isAuthenticated, (req, res, next) => {
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
      next(e);
    });
});
// end ----

// DELETE BY ID / DELETE ----
router.delete('/students/:id', isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  Student.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((e) => {
      next(e);
    });
});
// end ---

// END ========

module.exports = router;
