const express = require("express");
const router = express.Router();
const EvaluationComponent = require("../models/EvalutationComponent");

// Gets all evaluation components
router.get("/", async (req, res) => {
  try {
    const evaluationComponents = await EvaluationComponent.find().populate(
      "class"
    );
    res.json(evaluationComponents);
  } catch (error) {
    res.json({ message: error });
  }
});

//Gets a specified evaluation component
router.get("/:evaluationComponentId", async (req, res) => {
  try {
    evaluationComponent = await EvaluationComponent.findById(
      req.params.evaluationComponentId
    ).populate("class");
    res.json(evaluationComponent);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Adds an evaluation component
router.post("/", async (req, res) => {
  const evaluationComponent = new EvaluationComponent({
    name: req.body.name,
    class: req.body.class,
  });

  try {
    const savedEvaluationComponent = await evaluationComponent.save();
    res.json(savedEvaluationComponent);
  } catch (error) {
    res.json({ message: error });
  }
});

// Updates a specific evaluation component
router.put("/:evaluationComponentId", async (req, res) => {
  try {
    const updatedEvalucationComponent = await EvaluationComponent.updateOne(
      {
        _id: req.params.evaluationComponentId,
      },
      {
        $set: {
          name: req.body.name,
          class: req.body.class,
        },
      }
    );
    res.json(updatedEvalucationComponent);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Deletes a specific evaluation component
router.delete("/:evaluationComponentId", async (req, res) => {
  try {
    const removedEvaluationComponent = await EvaluationComponent.remove({
      _id: req.params.evaluationComponentId,
    });
    res.json(removedEvaluationComponent);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

module.exports = router;
