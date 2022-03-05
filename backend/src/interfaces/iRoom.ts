//External Dependencies import
import { Types } from 'mongoose';

//Creates a Interface and exports it
export default interface iBoard {
    _id: Types.ObjectId;
    roomName: string;
}
