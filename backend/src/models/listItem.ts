//External Dependencies import
import { Schema, model } from 'mongoose';

//Local Dependencies Import
import iListItem from '../interfaces/iListItem';

//Creates the Schema
const ListItemSchema = new Schema({
    teamName: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    clues: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//Creates the model from Schema
const Board = model<iListItem>('listItem', ListItemSchema);

//Exports the model
export default Board;
