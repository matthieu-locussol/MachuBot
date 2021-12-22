import type { SelectMenuComponentHandler } from '../../../../types/components';

export const SelectHandler: SelectMenuComponentHandler = async (interaction) => {
   await interaction.update({
      content: `Options selected: ${interaction.values.join(', ')}`,
      components: [],
   });
};
