//External Dependencies Import
import { Types } from 'mongoose';

//Local Dependencies Import
import Score from './models/Score';

/**
 * @name createScore
 * @param  {string} teamName - Name of the team
 * @param  {string} room - Room the team played
 * @returns {Promise<iScore>} - Returns the created score
 * @description This function creates a new score
 */
export async function createScore(
    teamName: string,
    room: string,
    clues: number,
    minutes: number,
    seconds: number,
    date: Date,
) {
    if (
        teamName &&
        room &&
        typeof clues == 'number' &&
        clues >= 0 &&
        typeof minutes == 'number' &&
        minutes > 0 &&
        typeof seconds == 'number' &&
        seconds >= 0 &&
        date
    ) {
        const time = minutes * 60 + seconds;
        const item = new Score({
            teamName,
            room,
            clues,
            time,
            date,
        });

        //Saves the board
        return await item.save();
    } else {
        return false;
    }
}

/**
 * @name getItems
 * @returns {Promise<iScore[]>} - Returns the scores
 * @description This function returns all the scores
 */
export async function getScores() {
    return await Score.find({}).sort({ createdAt: -1 });
}

/**
 * @name getItemsWithID
 * @param roomID string - The room ID
 * @returns {Promise<iScore[]>} - Returns the scores
 * @description This function returns all the scores with the given id
 */
export async function getScoresWithID(roomID: string) {
    return await Score.find({ room: new Types.ObjectId(roomID) }).sort({ createdAt: -1 });
}

/**
 * @name deleteListItem
 * @param  {string} id - ID of the item to delete
 * @returns {Promise<iScore>} - Returns all new items
 */
export async function deleteScore(id: string) {
    return await Score.findByIdAndRemove(new Types.ObjectId(id));
}
