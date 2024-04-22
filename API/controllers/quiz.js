import Quiz from "../models/Quiz.js";

// CREATE
export const createQuiz = async (req, res, next) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(200).json(newQuiz);
  } catch (error) {
    next(error);
  }
};

// UPDATE 
export const updateQuiz = async (req, res, next) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new: true}
    );
    res.status(200).json(updatedQuiz);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteQuiz = async (req, res, next) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.status(200).json("Quiz has been deleted.")
  } catch (error) {
    next(error);
  }
};

// GET
export const getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
    .populate("createdBy");
    res.status(200).json(quiz);
  } catch (error) {
    next(error);
  }
};

// GET ALL
export const getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find()
    .populate("createdBy")
    res.status(200).json(quizzes)
  } catch (error) {
    next(error);
  }
};
