// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        questId: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
            enum: [1, 2, 3, 4],
        },
        section: {
            type: String,
            required: true,
            enum: [1, 2, 3, 4],
        },
        mobile: {
            type: String,
            required: true,
        },
        ideathonParticipant: {
            type: Boolean,
            default: false,
        },
        coins: {
            type: Number,
            default: 0,
        },
        admin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
