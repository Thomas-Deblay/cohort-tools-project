const router = require('express').Router();
const mongoose = require('mongoose');
const Cohort = require('../data/Cohorts.model');

const { isAuthenticated } = require('../middleware/jwt.middleware');

router.get('/cohorts', (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log('Retrieved Cohorts ->', cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      next(e);
    });
});

// GET A SPECIFIC BY ID / GET-------
router.get('/cohorts/:id', (req, res, next) => {
  const { id } = req.params;
  Cohort.findById(id)
    .then((cohortFromDB) => {
      res.status(200).json(cohortFromDB);
    })
    .catch((e) => {
      next(e);
    });
});
// end ---

// CREATE A NEW / POST------
router.post('/cohorts', isAuthenticated, (req, res, next) => {
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
      next(e);
    });
});

// UPDATE BY ID / PUT--------
router.put('/cohorts/:id', isAuthenticated, (req, res, next) => {
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
      next(e);
    });
});
// end ----

// DELETE BY ID / DELETE ----
router.delete('/cohorts/:id', isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  Cohort.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = router;
