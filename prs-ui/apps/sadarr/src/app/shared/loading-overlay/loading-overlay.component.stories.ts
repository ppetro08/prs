import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LoadingOverlayComponent } from './loading-overlay.component';

export default {
  title: 'LoadingOverlayComponent',
  component: LoadingOverlayComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<LoadingOverlayComponent>;

const Template: Story<LoadingOverlayComponent> = (args: LoadingOverlayComponent) => ({
  component: LoadingOverlayComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    diameter:  35,
    show:  false,
    strokeWidth:  4,
}