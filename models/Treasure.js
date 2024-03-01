import mongoose from 'mongoose';

const treasureHuntSetSchema = new mongoose.Schema({
    riddles: [String],
    enabled: {
        type: Boolean,
        default: false,
    },
});

const Treasure = mongoose.models.Treasure || mongoose.model('Treasure', treasureHuntSetSchema);

export default Treasure;
