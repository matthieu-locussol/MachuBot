import 'dotenv/config';
import { Bot } from './bot';
import { pingModule } from './modules/ping';

const MachuBot = new Bot([pingModule]);
MachuBot.start();
