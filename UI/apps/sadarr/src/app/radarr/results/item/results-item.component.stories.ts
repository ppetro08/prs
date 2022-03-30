import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { LozengeModule } from '../../../shared/lozenge/lozenge.module';
import { ProfileSelectModule } from '../../../shared/profile-select/profile-select.module';
import { ResultsModule } from '../results.module';
import { ResultsItemComponent } from './results-item.component';

export default {
  title: 'RadarrResultsItemComponent',
  component: ResultsItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        LozengeModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        ProfileSelectModule,
        ReactiveFormsModule,
        ResultsModule,
      ],
    }),
  ],
} as Meta<ResultsItemComponent>;

const Template: Story<ResultsItemComponent> = (args: ResultsItemComponent) => ({
  component: ResultsItemComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  item: {
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
