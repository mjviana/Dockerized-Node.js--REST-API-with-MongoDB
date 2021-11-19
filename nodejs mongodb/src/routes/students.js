const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Gets all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("grades").populate("course");
    res.json(students);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Get a specific student
router.get("/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId)
      .populate("grades")
      .populate("course");
    res.json(student);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Creates a student
router.post("/", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    sex: req.body.sex,
    birthdate: req.body.birthdate,
    notes: req.body.notes,
    course: req.body.course,
    grades: req.body.grades,
  });

  try {
    const savedStudent = await student.save();
    res.json(savedStudent);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Deletes a specific student
router.delete("/:studentId", async (req, res) => {
  try {
    const removedStudent = await Student.remove({ _id: req.params.studentId });
    res.json(removedStudent);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Updates a specific student
router.put("/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.updateOne(
      { _id: req.params.studentId },
      {
        $set: {
          name: req.body.name,
          sex: req.body.sex,
          birthdate: req.body.birthdate,
          notes: req.body.notes,
          course: req.body.course,
          grades: req.body.grades,
        },
      }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
