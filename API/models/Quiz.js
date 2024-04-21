import mongoose from 'mongoose';
const QuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: (options) => options.length <= 4,
            message: "Maximum of 4 options allowed",
          },
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
})

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questions: {
        type:[QuestionSchema],
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Quiz', QuizSchema);