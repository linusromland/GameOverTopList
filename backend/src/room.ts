//External Dependencies Import
import { Types } from 'mongoose';
import fs from 'fs';
import path from 'path';

//Local Dependencies Import
import room from './models/Room';

/**
 * @name createRoom
 * @param  {string} roomName - Name of the room
 * @returns {Promise<iRoom>} - Returns the created ListItem
 * @description This function creates a new board
 */
export async function createRoom(roomName: string) {
    //Create roomImages folder for the room
    const roomImagesPath = path.resolve(`${__dirname}/roomImages/${roomName}`);

    if (!fs.existsSync(roomImagesPath)) {
        fs.mkdirSync(roomImagesPath);
    }

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
 * @name getRandomImage
 * @param  {string} roomID - ID of the room
 * @returns {Promise<string>} - Returns the path of the random image
 * @description This function gets a random image from the room
 */
export async function getRandomImage(roomID: string) {
    const room = await getRoomByID(roomID);

    if (!room || !room._id) return;
    const roomImagesPath = path.resolve(`${__dirname}/roomImages/${room.roomName}`);
    const files = fs.readdirSync(roomImagesPath);
    const randomImage = files[Math.floor(Math.random() * files.length)];

    return `/roomImages/${room.roomName}/${randomImage}`;
}

/**
 * @name getRoomByID
 * @param  {string} roomID - ID of the room
 * @returns {Promise<iRoom[]>} - Returns the board
 * @description This function returns the board
 */
export async function getRoomByID(roomID: string) {
    return await room.findOne({ _id: new Types.ObjectId(roomID) });
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
