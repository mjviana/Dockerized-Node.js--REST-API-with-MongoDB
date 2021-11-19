const express = require("express");
const router = express.Router();
const Grade = require("../models/Grade");

// Gets all grades
router.get("/", async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate("student")
      .populate("evaluationComponent");
    res.json(grades);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

//Gets a specified grade
router.get("/:gradeId", async (req, res) => {
  try {
    grade = await Grade.findById(req.params.gradeId)
      .populate("student")
      .populate("evaluationComponent");
    res.json(grade);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Adds a grade
router.post("/", async (req, res) => {
  const grade = new Grade({
    value: req.body.value,
    evaluationComponent: req.body.evaluationComponent,
    student: req.body.student,
  });
  try {
    const savedGrade = await grade.save();
    res.json(savedGrade);
  } catch (error) {
    res.json({ message: error });
  }
});

// Updates a specific grade
router.put("/:gradeId", async (req, res) => {
  try {
    const updatedGrade = await Grade.updateOne(
      {
        _id: req.params.gradeId,
      },
      {
        $set: {
          value: req.body.value,
          evaluationComponent: req.body.evaluationComponent,
          student: req.body.student,
        },
      }
    );
    res.json(updatedGrade);
  } catch (error) {
    res.json({ message: error });
  }
});

// Deletes a specific grade
router.delete("/:gradeId", async (req, res) => {
  try {
    const removedGrade = await Grade.remove({ _id: req.params.gradeId });
    res.json(removedGrade);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
