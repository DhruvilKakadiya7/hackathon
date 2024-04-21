import mongoose from 'mongoose';

const interviewSchema = mongoose.Schema({
    interviewId: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
    },
    answers: {
        type: Object,
    }, 
    skills: {
        type: String,
    }
});

export default mongoose.model("responses", interviewSchema); 