import 'dotenv/config';
import { Bot } from './bot';
import { cryptoModule } from './modules/crypto';
// eslint-disable-next-line import/no-cycle
import { musicModule } from './modules/music';
import { osuModule } from './modules/osu';
import { pingModule } from './modules/ping';
import { sampleModule } from './modules/sample';
import { statusModule } from './modules/status';

const modules = [pingModule, cryptoModule, statusModule, osuModule, musicModule];

if (process.env.NODE_ENV !== 'production') {
   modules.push(sampleModule);
}

const MachuBot = new Bot(modules);
MachuBot.start();
