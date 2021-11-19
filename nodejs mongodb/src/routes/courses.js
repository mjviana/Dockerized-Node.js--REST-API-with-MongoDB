const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

//Gets all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("classes");
    res.json(courses);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

//Gets a specified course
router.get("/:courseId", async (req, res) => {
  try {
    course = await Course.findById(req.params.courseId).populate("classes");
    res.json(course);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Adds a course
router.post("/", async (req, res) => {
  console.log(req.body)
  const course = new Course({
    name: req.body.name,
    year: req.body.year,
    classes: req.body.classes,
  });
  try {
    const savedCourse = await course.save();
    res.json(savedCourse);
  } catch (error) {
    res.json({ message: error });
  }
});

// Updates a specific course
router.put("/:courseId", async (req, res) => {
  try {
    const updatedCourse = await Course.updateOne(
      {
        _id: req.params.courseId,
      },
      {
        $set: {
          name: req.body.name,
          year: req.body.year,
          classes: req.body.classes,
        },
      }
    );
    res.json(updatedCourse);
  } catch (error) {
    res.json({ message: error });
  }
});

// Deletes a specific course
router.delete("/:courseId", async (req, res) => {
  try {
    const removedCourse = await Course.remove({ _id: req.params.courseId });
    res.json(removedCourse);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
