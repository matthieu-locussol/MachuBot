import type { ButtonComponentHandler } from '../../../../types/components';

export const buttonHandler: ButtonComponentHandler = async (interaction) => {
   await interaction.update({
      content: 'Button clicked!',
      components: [],
   });
};
