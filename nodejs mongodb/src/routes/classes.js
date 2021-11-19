const express = require("express");
const router = express.Router();
const Class = require("../models/Class");

// Gets all classes
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("students")
      .populate("evaluationComponents");
    res.json(classes);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Get a specific class
router.get("/:classId", async (req, res) => {
  try {
    const c = await Class.findById(req.params.classId)
      .populate("students")
      .populate("evaluationComponents");
    res.json(c);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Adds a class
router.post("/", async (req, res) => {
  const c = new Class({
    name: req.body.name,
    notes: req.body.notes,
    students: req.body.students,
    evaluationComponents: req.body.evaluationComponents,
  });

  try {
    const savedClass = await c.save();
    res.json(savedClass);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Deletes a specific class
router.delete("/:classId", async (req, res) => {
  try {
    const removedClass = await Class.remove({ _id: req.params.classId });
    res.json(removedClass);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Updates a specific class
router.put("/:classId", async (req, res) => {
  try {
    const updatedClass = await Class.updateOne(
      {
        _id: req.params.classId,
      },
      {
        $set: {
          name: req.body.name,
          notes: req.body.notes,
          students: req.body.students,
          evaluationComponents: req.body.evaluationComponents,
        },
      }
    );
    res.json(updatedClass);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
