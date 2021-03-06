//External Dependencies Import
import { Request, Response, Router } from 'express';

//Local Dependencies Import
import { createRoom, getRooms, deleteRoom, updateRoomName, getRandomImage } from '../room';
import iRoom from '../interfaces/iRoom';

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
 * @name get/room
 * @param {string} roomID - ID of the room
 * @description This route returns a random image of the room
 */
router.get('/image/:id', async (req: Request, res: Response) => {
    const image = await getRandomImage(req.params.id);
    res.json({ image: image }).status(200);
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

/**
 * @name patch/updateName
 * @description This route updates the name of a room
 */
router.patch('/updateName', async (req: Request, res: Response) => {
    await updateRoomName(req.body.id, req.body.roomName);
    const rooms = await getRooms();
    res.json(rooms).status(200);
});

/**
 * @name delete/delete/:id
 * @description This route deletes an room
 */
router.delete('/delete/:id', async (req: Request, res: Response) => {
    //Check that roomID is valid
    const roomID = req.params.id;
    const rooms = await getRooms();
    const roomExists = rooms.find((room: iRoom) => room._id.toString() === roomID);
    if (!roomExists) {
        res.json({
            error: 'Room does not exist',
        }).status(400);
        return;
    }

    //Delete item
    await deleteRoom(roomID);

    const updatedRooms = await getRooms();

    res.json(updatedRooms).status(200);
});

export default router;
