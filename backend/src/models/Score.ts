//External Dependencies import
import { Schema, model } from 'mongoose';

//Local Dependencies Import
import iScore from '../interfaces/iScore';

//Creates the Schema
const ScoreSchema = new Schema({
    teamName: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    clues: {
        type: Number,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//Creates the model from Schema
const Score = model<iScore>('Score', ScoreSchema);

//Exports the model
export default Score;
