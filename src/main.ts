import 'dotenv/config';
import { Bot } from './bot';
import { pingModule } from './modules/ping';
import { sampleModule } from './modules/sample';

const modules = [pingModule];

if (process.env.NODE_ENV !== 'production') {
   modules.push(sampleModule);
}

const MachuBot = new Bot(modules);
MachuBot.start();
