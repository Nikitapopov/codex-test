// import express from 'express';
import log4js from 'log4js';
import { createExpressServer } from 'routing-controllers';
import { ArtistController } from './controller/artist-controller';
import dotenv from 'dotenv';
import {SongController} from './controller/song-controller';
import cors from 'cors';
dotenv.config();

const corsOptions = {
    origin: '*'
    // origin: 'http://localhost:3000',
    // methods: 'GET,PUT,POST,DELETE',
    // optionsSuccessStatus: 200
};

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;
// logger.info('log4js log info');
// logger.debug('log4js log debug');
// logger.error('log4js log error');
// const app = express();
const port = process.env.PORT;
const app = createExpressServer({
    // cors: cors(corsOptions),
    controllers: [
        ArtistController,
        SongController
    ], // we specify controllers we want to use
});
// app.get('/', (request, response) => {
//     response.send('Hello world!');
// });
app.use(cors(corsOptions));
app.listen(port, () => console.log(`Running on port ${port}`));