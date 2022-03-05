//External Dependencies import
import { Schema, model } from 'mongoose';

//Local Dependencies Import
import iRoom from '../interfaces/iRoom';

//Creates the Schema
const RoomSchema = new Schema({
    roomName: {
        type: String,
        required: true,
    },
});

//Creates the model from Schema
const Room = model<iRoom>('Room', RoomSchema);

//Exports the model
export default Room;
