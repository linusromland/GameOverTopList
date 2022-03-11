//External Dependencies import
import express from 'express';
import ip from 'ip';
import * as dotenv from 'dotenv';
import history from 'connect-history-api-fallback';
import path from 'path';

//Configuring dotenv
if (process.env.NODE_ENV === 'development') dotenv.config();

//Local Dependencies Import
import { setup as connectToMongoDB } from './database';

//Variable Declarations
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGOURL || 'mongodb://localhost:27017/';

//Configuring express
const app = express();
app.use(express.json());

//Connecting to MongoDB
connectToMongoDB('GameOverTopList', mongoURL);

//Routes import
import scoreRoutes from './routes/scoreRoutes';
import roomRoutes from './routes/roomRoutes';

app.use('/api/scores', scoreRoutes);
app.use('/api/rooms', roomRoutes);

//Configure Express for Vue History Mode
app.use(history());

//Add Frontend Build
app.use('/', express.static(path.join(path.resolve(), '../frontend/dist')));

app.listen(port, () => {
    console.log(
        `\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m`,
    );
});
