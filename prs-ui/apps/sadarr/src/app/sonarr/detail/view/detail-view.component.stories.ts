import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { LozengeModule } from '../../../shared/lozenge/lozenge.module';
import { DetailViewComponent } from './detail-view.component';

export default {
  title: 'DetailViewComponent',
  component: DetailViewComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        LozengeModule,
        MatExpansionModule,
        MatIconModule,
        MatTableModule,
      ],
    }),
  ],
} as Meta<DetailViewComponent>;

const Template: Story<DetailViewComponent> = (args: DetailViewComponent) => ({
  component: DetailViewComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  seriesDetail: {
    id: 0,
    monitored: true,
    network: 'NBC',
    overview: `Raymond “Red” Reddington, one of the FBI’s most wanted fugitives,
    surrenders in person at FBI Headquarters in Washington, D.C. He claims
    that he and the FBI have the same interests—bringing down dangerous
    criminals and terrorists. In the last two decades, he’s made a list of
    criminals and terrorists that matter the most but the FBI cannot find
    because it does not know they exist. Reddington calls this “The
    Blacklist.” Reddington will co-operate with the FBI, but insists that he
    will speak only to Elizabeth Keen, a rookie profiler.`,
    profile: '1080p/720p',
    rating: 87,
    remotePoster:
      'http://piperopni.ddns.net:38082/MediaCover/19/poster-500.jpg?lastWrite=637100166888118700',
    seasons: [
      {
        expanded: false,
        monitored: true,
        episodes: [
          {
            airDate: new Date(2021, 11, 9),
            episodeNumber: 6,
            monitored: true,
            status: 'Unaired',
            title: 'Dr. Roberta Sand, Ph.D.',
          },

          {
            airDate: new Date(2021, 10, 18),
            episodeNumber: 5,
            monitored: true,
            status: 'WEBDL-1080p',
            title: 'Benjamin T. Okara',
          },
          {
            airDate: new Date(2021, 10, 11),
            episodeNumber: 4,
            monitored: true,
            status: 'HDTV-1080p',
            title: 'The Avenging Angel',
          },
          {
            airDate: new Date(2021, 10, 4),
            episodeNumber: 3,
            monitored: true,
            status: 'WEBDL-1080p',
            title: 'The SPK',
          },
          {
            airDate: new Date(2021, 9, 28),
            episodeNumber: 2,
            monitored: true,
            status: 'WEBDL-1080p',
            title: 'The Skinner: Conclusion',
          },
          {
            airDate: new Date(2021, 9, 21),
            episodeNumber: 1,
            monitored: true,
            status: 'WEBDL-1080p',
            title: 'The Skinner',
          },
        ],
        seasonNumber: 9,
      },
      {
        expanded: false,
        monitored: true,
        episodes: [
          {
            airDate: new Date(2021, 11, 9),
            episodeNumber: 6,
            monitored: true,
            status: 'Unaired',
            title: 'Dr. Roberta Sand, Ph.D.',
          },

          {
            airDate: new Date(2021, 10, 18),
            episodeNumber: 5,
            monitored: true,
            status: 'WEBDL-1080p',
            title: 'Benjamin T. Okara',
          },
          {
            airDate: new Date(2021, 10, 11),
            episodeNumber: 4,
            monitored: true,
            status: 'HDTV-1080p',
            title: 'The Avenging Angel',
          },
          {
            airDate: new Date(2021, 10, 4),
            episodeNumber: 3,
            monitored: true,
            status: 'WEBDL-1080p',
            title: 'The SPK',
          },
          {
            airDate: new Date(2021, 9, 28),
            episodeNumber: 2,
            monitored: true,
            status: 'WEBDL-1080p',
            title: 'The Skinner: Conclusion',
          },
          {
            airDate: new Date(2021, 9, 21),
            episodeNumber: 1,
            monitored: true,
            status: 'WEBDL-1080p',
            title: 'The Skinner',
          },
        ],
        seasonNumber: 8,
      },
    ],
    status: 'continuing',
    title: 'The Blacklist',
    yearSpan: '2013-',
  },
};
