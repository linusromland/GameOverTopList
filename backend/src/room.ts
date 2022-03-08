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
 * @name updateRoomName
 * @param id - The id of the room
 * @param roomName - The new name of the room
 * @returns {Boolean} - Returns true if the room was updated
 * @description This function updates the name of the room
 */
export async function updateRoomName(id: string, roomName: string) {
    if (id && roomName) {
        return await room.findByIdAndUpdate(new Types.ObjectId(id), { roomName }, { new: true });
    } else {
        return false;
    }
}

/**
 * @name deleteRoom
 * @param  {string} id - ID of the room to delete
 * @returns {Promise<iListItem>} - Returns all new rooms
 */
export async function deleteRoom(id: string) {
    return await room.findByIdAndRemove(new Types.ObjectId(id));
}
