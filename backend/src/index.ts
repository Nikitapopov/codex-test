import log4js from 'log4js';
import { createExpressServer } from 'routing-controllers';
import { ArtistController } from './controller/Artist-controller';
import dotenv from 'dotenv';
import {SongController} from './controller/Song-controller';
import cors from 'cors';
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    optionsSuccessStatus: 200
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
    ],
});
//todo вкл cors для всех запросов
app.use(cors(corsOptions));
app.listen(port, () => console.log(`Running on port ${port}`));