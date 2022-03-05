//External Dependencies Import
import { Request, Response, Router } from 'express';

//Local Dependencies Import
import { createRoom, getRooms } from '../room';

//Variable Declarations
const router = Router();

/**
 * @name get/room
 * @description This route returns all the rooms
 */
router.get('/', async (req: Request, res: Response) => {
    res.json(await getRooms()).status(200);
});

/**
 * @name post/create
 * @description This route creates a new item
 */
router.post('/create', async (req: Request, res: Response) => {
    await createRoom(req.body.roomName);
    const rooms = await getRooms();

    res.json(rooms).status(200);
});

export default router;
