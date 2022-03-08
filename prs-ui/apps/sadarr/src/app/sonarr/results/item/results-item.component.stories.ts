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
  title: 'SonarrResultsItemComponent',
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
    added: true,
    id: 1,
    monitored: true,
    network: 'NBC',
    overview:
      'Raymond “Red” Reddington, one of the FBI’s most wanted fugitives, surrenders in person at FBI Headquarters in Washington, D.C. He claims that he and the FBI have the same interests—bringing down dangerous criminals and terrorists. In the last two decades, he’s made a list of criminals and terrorists that matter the most but the FBI cannot find because it does not know they exist. Reddington calls this “The Blacklist.” Reddington will co-operate with the FBI, but insists that he will speak only to Elizabeth Keen, a rookie profiler.',
    profileId: 7,
    rating: 87,
    remotePoster: 'https://artworks.thetvdb.com/banners/posters/266189-1.jpg',
    seasonCount: 9,
    seasons: [
      {
        seasonNumber: 1,
        monitored: false,
      },
      {
        seasonNumber: 2,
        monitored: false,
      },
      {
        seasonNumber: 3,
        monitored: false,
      },
      {
        seasonNumber: 4,
        monitored: false,
      },
      {
        seasonNumber: 5,
        monitored: false,
      },
      {
        seasonNumber: 6,
        monitored: false,
      },
      {
        seasonNumber: 7,
        monitored: false,
      },
      {
        seasonNumber: 8,
        monitored: false,
      },
      {
        seasonNumber: 9,
        monitored: true,
      },
    ],
    status: 'continuing',
    title: 'The Blacklist',
    tvdbId: 266189,
    year: 2013,
  },
  profiles: [
    {
      name: '720p',
      id: 3,
    },
    {
      name: '1080p',
      id: 4,
    },
    {
      name: '1080p/720p',
      id: 7,
    },
    {
      name: 'Any',
      id: 8,
    },
    {
      name: 'DVD',
      id: 9,
    },
  ],
};

// not added item, need to add another story
// {
//   added: false,
//   images: [
//     {
//       coverType: 'poster',
//       url: 'https://artworks.thetvdb.com/banners/v4/series/394358/posters/61868a5b09422.jpg',
//     },
//     {
//       coverType: 'fanart',
//       url: 'https://artworks.thetvdb.com/banners/series/394358/backgrounds/5ff10ea4b62d1.jpg',
//     },
//   ],
//   monitored: true,
//   network: 'één',
//   overview:
//     'Together with young children, host Tom Waes, performs exciting activities and stunts.',
//   profile: 0,
//   rating: 0,
//   remotePoster:
//     'https://artworks.thetvdb.com/banners/v4/series/394358/posters/61868a5b09422.jpg',
//   seasonCount: 2,
//   seasons: [
//     {
//       seasonNumber: 1,
//       monitored: true,
//     },
//     {
//       seasonNumber: 2,
//       monitored: true,
//     },
//   ],
//   status: 'ended',
//   title: 'The Blacklist',
//   titleSlug: 'the-blacklist',
//   tvdbId: 394358,
//   year: 2014,
// }
