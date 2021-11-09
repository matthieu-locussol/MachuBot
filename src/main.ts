import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { Bot } from './bot';
import { pingModule } from './modules/ping';

dotenv.config({ path: resolve(__dirname, '../.env') });

const MachuBot = new Bot([pingModule]);
MachuBot.start();
