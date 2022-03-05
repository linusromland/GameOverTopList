//External Dependencies Import
import { Types } from 'mongoose';

//Local Dependencies Import
import listItem from './models/listItem';

/**
 * @name createListItem
 * @param  {string} teamName - Name of the team
 * @param  {string} room - Room the team played
 * @returns {Promise<iListItem>} - Returns the created ListItem
 * @description This function creates a new board
 */
export async function createListItem(teamName: string, room: string, minutes: number, seconds: number) {
    if (teamName && room && minutes && seconds) {
        const item = new listItem({
            teamName,
            room,
            minutes,
            seconds,
        });

        //Saves the board
        return await item.save();
    } else {
        return false;
    }
}

/**
 * @name getItems
 * @returns {Promise<iListItem[]>} - Returns the boards
 * @description This function returns all the boards
 */
export async function getItems() {
    return await listItem.find({});
}
