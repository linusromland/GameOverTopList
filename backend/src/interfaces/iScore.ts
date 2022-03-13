//External Dependencies import
import { Types } from 'mongoose';

//Creates a Interface and exports it
export default interface iScore {
    _id: Types.ObjectId;
    teamName: string;
    room: string;
    time: number;
    clues: number;
    date: Date;
    createdAt: Date;
}
