import type { SelectMenuComponentHandler } from '../../../../types/components';

export const selectHandler: SelectMenuComponentHandler = async (interaction) => {
   await interaction.update({
      content: `Options selected: ${interaction.values.join(', ')}`,
      components: [],
   });
};
