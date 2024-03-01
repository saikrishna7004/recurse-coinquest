import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        coins: {
            type: Number,
            default: 0,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);

export default Team;
