import mongoose from 'mongoose';

const questionsSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
    },
    type: {
        type: String,
    },
    level: {
        type: String,
    }
});

export default mongoose.model("questions", questionsSchema); 