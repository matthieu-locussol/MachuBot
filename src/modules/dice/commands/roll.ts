import {
   ActionRowBuilder,
   AttachmentBuilder,
   ButtonBuilder,
   ButtonInteraction,
   CommandInteraction,
   userMention,
} from 'discord.js';
import mergeImages from 'merge-images';
import { sum } from '../../../utils/array';
import { random } from '../../../utils/number';
import { d12ButtonComponent } from '../components/ui/d12ButtonComponent';
import { d20ButtonComponent } from '../components/ui/d20ButtonComponent';
import { d6ButtonComponent } from '../components/ui/d6ButtonComponent';

const { Canvas, Image } = require('canvas');

export type DICE_TYPE = 'd6' | 'd12' | 'd20';

const SIZES: Record<DICE_TYPE, number> = {
   d6: 80,
   d12: 88,
   d20: 82,
};

const VALUES: Record<DICE_TYPE, number> = {
   d6: 6,
   d12: 12,
   d20: 20,
};

export const roll = async (
   interaction: CommandInteraction | ButtonInteraction,
   type: DICE_TYPE,
   count: number,
): Promise<void> => {
   await interaction.deferReply();

   if (interaction.member === null || interaction.guildId === null) {
      await interaction.editReply(
         `This command is supposed to be used inside a discord server channel by a server member.`,
      );

      return;
   }

   const rolls: number[] = [];

   [...Array(count)].forEach(() => rolls.push(random(1, VALUES[type])));

   const image = await mergeImages(
      rolls.map((entry, idx) => ({
         src: `assets/dices/${type}/${entry}.png`,
         x: SIZES[type] * idx,
         y: 0,
      })),
      {
         Canvas,
         Image,
         width: SIZES[type] * rolls.length,
      },
   );

   const attachment = new AttachmentBuilder(
      Buffer.from(image.replace(/^data:image\/png;base64,/, ''), 'base64'),
      { name: 'dice.png' },
   );

   await interaction.editReply({
      content:
         rolls.length > 1
            ? `${userMention(interaction.user.id)} rolled ${count} ${type}: total of **${sum(
                 rolls,
              )}**`
            : `${userMention(interaction.user.id)} rolled a ${type}: **${rolls[0]}**`,
      files: [attachment],
      components: [
         new ActionRowBuilder<ButtonBuilder>().addComponents([
            d6ButtonComponent,
            d12ButtonComponent,
            d20ButtonComponent,
         ]),
      ],
   });
};
