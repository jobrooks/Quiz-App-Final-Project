import express from 'express'
import { createQuiz, deleteQuiz, getQuiz, getQuizzes, updateQuiz } from '../controllers/quiz.js'
const router = express.Router();

router.post('/', createQuiz);

router.put('/:id', updateQuiz);

router.delete('/:id', deleteQuiz);

router.get('/find/:id', getQuiz);

router.get('/', getQuizzes);

export default router;