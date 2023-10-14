import 'dotenv/config';
import { Bot } from './bot';
import { cryptoModule } from './modules/crypto';
// eslint-disable-next-line import/no-cycle
import { diceModule } from './modules/dice';
import { musicModule } from './modules/music';
import { osuModule } from './modules/osu';
import { pingModule } from './modules/ping';
import { sampleModule } from './modules/sample';
import { statusModule } from './modules/status';
import { surveysModule } from './modules/surveys';

const modules = [
   pingModule,
   cryptoModule,
   statusModule,
   osuModule,
   musicModule,
   surveysModule,
   diceModule,
];

if (process.env.NODE_ENV !== 'production') {
   modules.push(sampleModule);
}

const MachuBot = new Bot(modules);
MachuBot.start();
