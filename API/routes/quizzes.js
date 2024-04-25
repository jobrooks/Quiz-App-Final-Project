import express from 'express'
import { createQuiz, deleteQuiz, getByTitle, getQuiz, getQuizzes, updateQuiz } from '../controllers/quiz.js'
const router = express.Router();

router.post('/', createQuiz);

router.put('/:id', updateQuiz);

router.delete('/:id', deleteQuiz);

router.get('/find/:id', getQuiz);

router.get('/', getQuizzes);

router.get('/search/:title', getByTitle)

export default router;