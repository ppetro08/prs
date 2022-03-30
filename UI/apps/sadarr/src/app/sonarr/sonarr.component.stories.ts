import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SonarrComponent } from './sonarr.component';

export default {
  title: 'SonarrComponent',
  component: SonarrComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<SonarrComponent>;

const Template: Story<SonarrComponent> = (args: SonarrComponent) => ({
  component: SonarrComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}