import mongoose from 'mongoose';

// Define the QuestionSchema using mongoose.Schema
const QuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

 // Export the model using the "Question" name and the defined schema
export default mongoose.model('Question', QuestionSchema);;
