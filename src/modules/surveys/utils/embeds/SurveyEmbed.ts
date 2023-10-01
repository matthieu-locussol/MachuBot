import { AttachmentBuilder, Colors, EmbedBuilder } from 'discord.js';
import { unique } from '../../../../utils/array';
import { Survey } from '../../../../utils/database';
import { toUpperFirst } from '../../../../utils/string';
import { computeAnswersPercentages } from '../computeAnswersPercentages';
import { computeProgressBar } from '../computeProgressBar';
import { getUserAvatar } from '../getUserAvatar';

export interface SurveyEmbedPayload extends Survey {
   author: string;
   authorAvatar: string | null;
}

export const makeSurveyEmbed = ({
   author,
   authorId,
   authorAvatar,
   question,
   answers,
   results,
   multiple,
}: SurveyEmbedPayload): {
   embed: EmbedBuilder;
   attachment: AttachmentBuilder;
} => {
   const total = Object.values(results).reduce((acc, curr) => acc + curr.length, 0);
   const allUserIds = unique(Object.values(results).flat());
   const percentages = computeAnswersPercentages(results);

   const attachment = new AttachmentBuilder('assets/Avatar.png', { name: 'Avatar.png' });
   const embed = new EmbedBuilder()
      .setThumbnail('attachment://Avatar.png')
      .setAuthor({ name: author, iconURL: getUserAvatar(authorId, authorAvatar) })
      .setTitle(toUpperFirst(question))
      .setDescription(
         `Total of ${total} vote${total > 1 ? 's' : ''} over ${allUserIds.length} participant${
            allUserIds.length > 1 ? 's' : ''
         }.`,
      )
      .addFields(
         answers.map((answer, idx) => ({
            name: `**${idx + 1}.** ${answer} (${
               results[idx].length !== 0
                  ? `${results[idx].length} vote${results[idx].length > 1 ? 's' : ''} - `
                  : ''
            }${Math.round(percentages[idx])}%)`,
            value: computeProgressBar(Math.round(percentages[idx])),
            inline: false,
         })),
      )
      .setColor(Colors.Red)
      .setFooter({
         text: multiple ? 'Multiple answers allowed' : 'Only one answer allowed',
      });

   return { embed, attachment };
};
