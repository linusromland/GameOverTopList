//External Dependencies Import
import { Request, Response, Router } from 'express';

//Local Dependencies Import
import { createListItem, getItems, getItemsWithID, deleteListItem } from '../listItem';
import { getRooms } from '../room';
import iListItem from '../interfaces/iListItem';

//Variable Declarations
const router = Router();

/**
 * @name get/items
 * @description This route returns all the items
 */
router.get('/', async (req: Request, res: Response) => {
    res.json(await getItems()).status(200);
});

/**
 * @name get/items/:id
 * @description This route returns all the items for the room with the given id
 */
router.get('/:roomID', async (req: Request, res: Response) => {
    res.json(await getItemsWithID(req.params.roomID)).status(200);
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
    console.log(req.body.clues);

    if (!roomExists) {
        res.json({
            error: 'Room does not exist',
        }).status(400);
        return;
    }
    console.log(req.body);

    await createListItem(
        req.body.teamName,
        req.body.room,
        req.body.clues.toString(),
        req.body.minutes,
        req.body.seconds,
    );
    const items = await getItems();

    res.json(items).status(200);
});

/**
 * @name delete/delete/:id
 * @description This route deletes an item
 */
router.delete('/delete/:id', async (req: Request, res: Response) => {
    //Check that itemID is valid
    const itemID = req.params.id;
    const item = await getItems();
    const itemExists = item.find((item: iListItem) => item._id.toString() === itemID);
    if (!itemExists) {
        res.json({
            error: 'Item does not exist',
        }).status(400);
        return;
    }

    //Delete item
    await deleteListItem(itemID);
    const items = await getItems();

    res.json(items).status(200);
});

export default router;
