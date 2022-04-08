//External Dependencies Import
import { Types } from 'mongoose';

//Local Dependencies Import
import Score from './models/Score';
import iScore from './interfaces/iScore';

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
    const scores = await Score.find({ room: new Types.ObjectId(roomID) }).sort({ createdAt: -1 });
    const scoresFromLast30Days = scores.filter((score) => {
        const date = new Date(score.date);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        return diff < 30 * 24 * 60 * 60 * 1000;
    });

    return {
        topLast30Days: cutArray(sortScores(scoresFromLast30Days, 0), 5),
        topAllTime: cutArray(sortScores(scores), 5),
    };
}

/**
 * @name sortScores
 * @param scores - Array of scores to sort
 * @param clueValue - The value in time of one clue
 * @returns Array<iScore> - Array of sorted scores
 * @description This function sorts the scores by time and clues
 */
function sortScores(scores: Array<iScore>, clueValue = 5000) {
    //sort by time
    const sortedScores = scores.sort((a, b) => {
        if (addCluesToTime(a.time, a.clues, clueValue) < addCluesToTime(b.time, b.clues, clueValue)) {
            return -1;
        }
        if (addCluesToTime(a.time, a.clues, clueValue) > addCluesToTime(b.time, b.clues, clueValue)) {
            return 1;
        }
        return 0;
    });
    return sortedScores;
}

/**
 * @name cutArray
 * @param scores - Array of scores to sort
 * @param numberInArray - Limit array to this number
 * @returns Array<iScore> - Array of sorted scores
 * @description This cuts array at specfic number
 */
function cutArray(scores: Array<iScore>, numberInArray: number) {
    if (scores.length > numberInArray) {
        return scores.slice(0, numberInArray);
    }
    return scores;
}

/**
 * @name addCluesToTime
 * @param time - The Time to add clues to
 * @param clues - The number of clues to add
 * @param clueValue - The value in time of one clue
 * @returns {number} - The new time
 * @description This function adds clues to a time
 */
function addCluesToTime(time: number, clues: number, clueValue: number) {
    return time + clues * clueValue;
}

/**
 * @name deleteListItem
 * @param  {string} id - ID of the item to delete
 * @returns {Promise<iScore>} - Returns all new items
 */
export async function deleteScore(id: string) {
    return await Score.findByIdAndRemove(new Types.ObjectId(id));
}
