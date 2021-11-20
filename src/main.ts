import 'dotenv/config';
import { Bot } from './bot';
import { pingModule } from './modules/ping';
import { sampleModule } from './modules/sample';
import { buttonComponent } from './modules/sample/components/button';
import { buttonSecondaryComponent } from './modules/sample/components/buttonSecondary';
import { selectComponent } from './modules/sample/components/select';

const modules = [pingModule];
const components = [];

if (process.env.NODE_ENV !== 'production') {
   modules.push(sampleModule);
   components.push(buttonComponent, buttonSecondaryComponent, selectComponent);
}

const MachuBot = new Bot({ modules, components });
MachuBot.start();
