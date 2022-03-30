import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ResultsModule } from '../results.module';
import { ResultsContainerComponent } from './results-container.component';

export default {
  title: 'RadarrResultsContainerComponent',
  component: ResultsContainerComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        ResultsModule,
        ScrollingModule,
      ],
    }),
  ],
} as Meta<ResultsContainerComponent>;

const Template: Story<ResultsContainerComponent> = (
  args: ResultsContainerComponent
) => ({
  component: ResultsContainerComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  data: [
    {
      hasFile: false,
      id: 1153,
      length: 102,
      monitored: true,
      overview:
        'Journalist Elizabeth Lane is one of the country\u0027s most famous food writers. In her columns, she describes herself as a hard working farm woman, taking care of her children, and being an excellent cook. But this is all lies. In reality, she is an unmarried New Yorker who can\u0027t even boil an egg. The recipes come from her good friend Felix. The owner of the magazine she works for has decided that a heroic sailor will spend his Christmas on *her* farm. Miss Lane knows that her career is over if the truth comes out, but what can she do?',
      profileId: 8,
      rating: 71,
      remotePoster:
        'https://image.tmdb.org/t/p/original/1rIJ5UHenGFUnRrFAASRuPPjrOq.jpg',
      status: 'released',
      studio: 'Warner Bros. Pictures',
      title: 'Christmas in Connecticut',
      tmdbId: 13669,
      year: 1945,
    },
    {
      hasFile: false,
      id: 0,
      length: 93,
      monitored: false,
      overview:
        'Elizabeth is the star of a successful cooking show and author of several cookbooks. But when her manager, Alexander sees forest ranger Jefferson, who lost his cabin in a fire, comment on TV about wishing he could get a home-cooked Christmas dinner, he arranges for a special live show on Christmas, for Elizabeth to cook him Christmas Dinner. Only Elizabeth can\u0027t cook, and trying to keep Jefferson and the viewing public from finding out on a live show may be a little difficult.',
      profileId: 0,
      rating: 39,
      remotePoster:
        'https://image.tmdb.org/t/p/original/gR5DOCDn5s4uCgTbcsaBBI1ci98.jpg',
      status: 'released',
      studio: '',
      title: 'Christmas in Connecticut',
      tmdbId: 55596,
      year: 1992,
    },
  ],
  showNoResultsFound: false,
  profiles: [
    {
      name: 'HD-720p',
      id: 3,
    },
    {
      name: 'HD-1080p',
      id: 4,
    },
    {
      name: 'HD - 720p/1080p',
      id: 6,
    },
    {
      name: 'Any',
      id: 8,
    },
  ],
};
