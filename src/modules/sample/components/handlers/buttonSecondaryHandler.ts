import type { ButtonComponentHandler } from '../../../../types/components';

export const buttonSecondaryHandler: ButtonComponentHandler = async (interaction) => {
   await interaction.update({
      content: 'Secondary clicked!',
      components: [],
   });
};
