import express from 'express'
import { createQuestion, deleteQuestion, getQuestion, getQuestions, updateQuestion } from '../controllers/question.js'
const router = express.Router();

router.post('/', createQuestion);

router.put('/:id', updateQuestion);

router.delete('/:id', deleteQuestion);

router.get('/find/:id', getQuestion);

router.get('/', getQuestions);

export default router;