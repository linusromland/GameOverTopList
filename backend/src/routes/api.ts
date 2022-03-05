//External Dependencies Import
import { Request, Response, Router } from 'express';

//Local Dependencies Import
import { createListItem, getItems } from '../listItem';

//Variable Declarations
const router = Router();

/**
 * @name get/items
 * @description This route returns all the items
 */
router.get('/items', async (req: Request, res: Response) => {
    res.json(await getItems()).status(200);
});

/**
 * @name post/createItem
 * @description This route creates a new item
 */
router.post('/createItem', async (req: Request, res: Response) => {
    await createListItem(req.body.teamName, req.body.room, req.body.minutes, req.body.seconds);
    const items = await getItems();

    res.json(items).status(200);
});

export default router;
