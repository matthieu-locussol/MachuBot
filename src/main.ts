import 'dotenv/config';
import { Bot } from './bot';
import { pingModule } from './modules/ping';
import { sampleModule } from './modules/sample';
import { buttonComponent } from './modules/sample/components/button';
import { buttonSecondaryComponent } from './modules/sample/components/buttonSecondary';
import { selectComponent } from './modules/sample/components/select';

const MachuBot = new Bot({
   modules: [sampleModule, pingModule],
   components: [buttonComponent, buttonSecondaryComponent, selectComponent],
});

MachuBot.start();
