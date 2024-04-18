import Question from "../models/Question.js";

// CREATE
export const createQuestion = async (req, res, next) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(200).json(newQuestion);
  } catch (error) {
    next(error);
  }
};

// UPDATE 
export const updateQuestion = async (req, res, next) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new: true}
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteQuestion = async (req, res, next) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json("Question has been deleted.")
  } catch (error) {
    next(error);
  }
};

// GET
export const getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
};

// GET ALL
export const getQuestions = async (req, res, next) => {
  try {
    const questions = Question.find();
    res.status(200).json(questions)
  } catch (error) {
    next(error);
  }
};

