//External Dependencies Import
import { Types } from 'mongoose';

//Local Dependencies Import
import room from './models/room';

/**
 * @name createRoom
 * @param  {string} roomName - Name of the room
 * @returns {Promise<iRoom>} - Returns the created ListItem
 * @description This function creates a new board
 */
export async function createRoom(roomName: string) {
    if (roomName) {
        const createdRoom = new room({
            roomName,
        });

        //Saves the board
        return await createdRoom.save();
    } else {
        return false;
    }
}

/**
 * @name getRooms
 * @returns {Promise<iRoom[]>} - Returns the boards
 * @description This function returns all the boards
 */
export async function getRooms() {
    return await room.find({});
}

/**
 * @name deleteRoom
 * @param  {string} id - ID of the room to delete
 * @returns {Promise<iListItem>} - Returns all new rooms
 */
export async function deleteRoom(id: string) {
    return await room.findByIdAndRemove(new Types.ObjectId(id));
}
