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
        name: {
            type: String,
            default: 'Nexus User',
            required: true
        },
        password: {
            type: String,
            default: 'password',
            required: true
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
