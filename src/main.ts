import 'dotenv/config';
import { Bot } from './bot';
import { buttonComponent } from './components/button';
import { buttonSecondaryComponent } from './components/buttonSecondary';
import { selectComponent } from './components/select';
import { pingModule } from './modules/ping';
import { sampleModule } from './modules/sample';

const MachuBot = new Bot({
   modules: [sampleModule, pingModule],
   components: [buttonComponent, buttonSecondaryComponent, selectComponent],
});

MachuBot.start();
