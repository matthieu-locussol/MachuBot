import { ActionRowBuilder, CommandInteraction, StringSelectMenuBuilder } from 'discord.js';
import { loadGuildDatabase } from '../../../../utils/database';
import { makeSurveyEmbed } from '../../utils/embeds/SurveyEmbed';

export const createSurvey = async (
   interaction: CommandInteraction,
   question: string,
   answers: string[],
   multiple: boolean,
): Promise<void> => {
   await interaction.deferReply();

   if (interaction.member === null || interaction.guildId === null) {
      await interaction.editReply(
         `This command is supposed to be used inside a discord server channel by a server member.`,
      );

      return;
   }

   await interaction.editReply({
      content: 'Creating the survey...',
   });

   const author = interaction.member.user;
   const authorGuildNickname =
      interaction.guild?.members.cache.get(author.id)?.nickname || author.username;
   const [database, { id: messageId }] = await Promise.all([
      loadGuildDatabase(interaction.guildId),
      interaction.fetchReply(),
   ]);

   const selectCustomId = `surveyAnswerSelect-${messageId}`;

   database.surveys[messageId] = {
      authorId: author.id,
      channelId: interaction.channelId,
      selectCustomId,
      question,
      answers,
      results: answers.reduce((acc, _, answerIdx) => ({ ...acc, [answerIdx]: [] }), {}),
      multiple,
   };

   const { attachment, embed } = makeSurveyEmbed({
      ...database.surveys[messageId],
      author: authorGuildNickname,
      authorAvatar: author.avatar,
   });

   await Promise.all([
      database.save(),
      interaction.editReply({
         content: '',
         embeds: [embed],
         files: [attachment],
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
      }),
   ]);
};
