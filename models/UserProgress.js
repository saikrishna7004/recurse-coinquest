// models/UserProgress.js
import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

const UserProgress = mongoose.models.UserProgress || mongoose.model('UserProgress', userProgressSchema);

export default UserProgress;
