import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ProfileSelectComponent } from './profile-select.component';
import { ProfileSelectModule } from './profile-select.module';

export default {
  title: 'ProfileSelectComponent',
  component: ProfileSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        ProfileSelectModule,
        ReactiveFormsModule,
      ],
    }),
  ],
} as Meta<ProfileSelectComponent>;

const Template: Story<ProfileSelectComponent> = (
  args: ProfileSelectComponent
) => ({
  component: ProfileSelectComponent,
  props: {
    ...args,
    formGroup: new FormGroup({
      profiles: new FormControl(3),
    }),
  },
  template: `
    <form [formGroup]="formGroup">
      <mat-form-field>
      <mat-label>Quality</mat-label>
        <pip-profile-select formControlName="profiles" [profiles]="profiles">
        </pip-profile-select>
      </mat-form-field>
    </form>

    {{formGroup.value | json}}
  `,
});

export const Primary = Template.bind({});
Primary.args = {
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
      name: '720p/1080p',
      id: 6,
    },
    {
      name: 'Any',
      id: 8,
    },
  ],
  disabled: false,
  required: false,
};
