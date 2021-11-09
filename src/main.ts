/* eslint-disable import/first */
/* eslint-disable import/order */

import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

import { Bot } from './bot';
import { pingModule } from './modules/ping';

const MachuBot = new Bot([pingModule]);
MachuBot.start();
