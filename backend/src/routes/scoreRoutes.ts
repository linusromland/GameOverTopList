//External Dependencies Import
import { Request, Response, Router } from 'express';

//Local Dependencies Import
import { createScore, getScores, getScoresWithID, deleteScore } from '../score';
import { getRooms } from '../room';
import iListItem from '../interfaces/iScore';

//Variable Declarations
const router = Router();

/**
 * @name get/items
 * @description This route returns all the items
 */
router.get('/', async (req: Request, res: Response) => {
    res.json(await getScores()).status(200);
});

/**
 * @name get/items/:id
 * @description This route returns all the items for the room with the given id
 */
router.get('/:roomID', async (req: Request, res: Response) => {
    res.json(await getScoresWithID(req.params.roomID)).status(200);
});

/**
 * @name post/create
 * @description This route creates a new item
 */
router.post('/create', async (req: Request, res: Response) => {
    //Check that roomID is valid
    const roomID = req.body.room;
    const room = await getRooms();
    const roomExists = room.find((room) => room.id === roomID);
    if (!roomExists) {
        res.json({
            error: 'Room does not exist',
        }).status(400);
        return;
    }
    await createScore(
        req.body.teamName,
        req.body.room,
        req.body.clues,
        req.body.minutes,
        req.body.seconds,
        req.body.date,
    );
    const items = await getScores();

    res.json(items).status(200);
});

/**
 * @name delete/delete/:id
 * @description This route deletes an item
 */
router.delete('/delete/:id', async (req: Request, res: Response) => {
    //Check that itemID is valid
    const itemID = req.params.id;
    const item = await getScores();
    const itemExists = item.find((item: iListItem) => item._id.toString() === itemID);
    if (!itemExists) {
        res.json({
            error: 'Item does not exist',
        }).status(400);
        return;
    }

    //Delete item
    await deleteScore(itemID);
    const items = await getScores();

    res.json(items).status(200);
});

export default router;
