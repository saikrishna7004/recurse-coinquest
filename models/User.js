// models/User.js
import mongoose from 'mongoose';
// const autoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        questId: {
            type: Number,
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
            enum: [
                'CSE A',
                'CSE B',
                'CSE C',
                'CSE D',
                'CSE E',
                'CSE F',
                'CSE G',
                'CSM A',
                'CSM B',
                'CSM C',
                'IT A',
                'IT B',
                'CSD',
            ],
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

// userSchema.pre('save', async function(next) {
//     try {
//         if (!this.questId) {
//             const userCount = await this.constructor.countDocuments();
//             this.questId = userCount + 1;
//         }
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
