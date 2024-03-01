import mongoose from 'mongoose';

const hintSchema = new mongoose.Schema({
    hintId: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    solvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    enabled: {
        type: Boolean,
        default: false,
    }
});

const Hint = mongoose.models.Hint || mongoose.model('Hint', hintSchema);

export default Hint;
