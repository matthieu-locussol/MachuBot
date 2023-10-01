import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import type { SelectMenuComponentHandler } from '../../../../types/components';
import { _assert, _assertTrue } from '../../../../utils/_assert';
import { loadGuildDatabase } from '../../../../utils/database';
import { makeSurveyEmbed } from '../../utils/embeds/SurveyEmbed';

export const answerSelectHandler: SelectMenuComponentHandler = async (interaction) => {
   await interaction.deferReply({ ephemeral: true });

   const { guildId } = interaction;

   if (guildId === null) {
      await interaction.editReply({
         content: `This command is supposed to be used inside a discord server channel by a server member.`,
         options: {
            ephemeral: true,
         },
      });

      return;
   }

   const database = await loadGuildDatabase(guildId);

   const userId = interaction.user.id;
   const messageId = interaction.message.id;
   const answerIds = interaction.values;
   console.log(userId, messageId, answerIds);
   const { answers, channelId, selectCustomId, authorId, multiple } = database.surveys[messageId];
   const author = interaction.guild?.members.cache.get(authorId)?.user;
   _assert(author, 'author should be defined');

   const userAnswers = answerIds.map((answerId) => answers[Number(answerId)]);
   const authorGuildNickname =
      interaction.guild?.members.cache.get(author.id)?.nickname || author.username;

   console.log(authorGuildNickname, userAnswers);

   const messageChannel = interaction.guild?.channels.cache.get(channelId);
   _assert(messageChannel, 'messageChannel should be defined');
   _assertTrue(messageChannel.isTextBased(), 'messageChannel should be a TextChannel');

   if (messageChannel.isTextBased()) {
      for (const answerIdx of Object.keys(database.surveys[messageId].results)) {
         const numericAnswerIdx = Number(answerIdx);

         if (
            answerIds.includes(answerIdx) &&
            !database.surveys[messageId].results[numericAnswerIdx].includes(userId)
         ) {
            database.surveys[messageId].results[numericAnswerIdx].push(userId);
         }

         if (
            !answerIds.includes(answerIdx) &&
            database.surveys[messageId].results[numericAnswerIdx].includes(userId)
         ) {
            database.surveys[messageId].results[numericAnswerIdx] = database.surveys[
               messageId
            ].results[numericAnswerIdx].filter((id) => id !== userId);
         }
      }

      const [message] = await Promise.all([
         messageChannel.messages.fetch(messageId),
         database.save(),
      ]);

      const { attachment, embed } = makeSurveyEmbed({
         ...database.surveys[messageId],
         author: authorGuildNickname,
         authorAvatar: author.avatar,
      });

      await message.edit({
         content: '',
         files: [attachment],
         embeds: [embed],
         components: [
            new ActionRowBuilder<StringSelectMenuBuilder>({
               components: [
                  new StringSelectMenuBuilder()
                     .setCustomId(selectCustomId)
                     .setPlaceholder(
                        multiple ? 'Select at least one answer' : 'Select only one answer',
                     )
                     .addOptions(
                        answers.map((answer, index) => ({
                           label: answer,
                           value: index.toString(),
                        })),
                     )
                     .setMinValues(1)
                     .setMaxValues(multiple ? answers.length : 1),
               ],
            }),
         ],
      });
   }

   await interaction.editReply({
      content: `You selected ${userAnswers.map((answer) => `"${answer}"`).join(', ')}!`,
   });
};
