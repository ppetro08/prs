import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { UsersRoles } from '../../../authentication/models/user.model';
import { Profile } from '../../../shared/profile-select/profile';
import { AddEvent, Movie, RequestEvent } from '../../models/radarr';
import { ResultItemFormValue } from './result-item';

@Component({
  selector: 'pip-radarr-results-item',
  templateUrl: './results-item.component.html',
  styleUrls: ['./results-item.component.scss'],
  host: {
    class: 'radarr-results-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsItemComponent implements OnDestroy {
  @Input() item?: Movie;

  @Input() profiles: Profile[] = [];

  @Input() usersRoles: UsersRoles | null;

  @Output() addClick = new EventEmitter<AddEvent>();

  @Output() requestClick = new EventEmitter<RequestEvent>();

  formGroup: FormGroup;

  private destroyed$ = new Subject<void>();

  constructor() {
    this.formGroup = new FormGroup({
      profile: new FormControl(6),
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  onSubmit(item: Movie): void {
    this.addClick.emit(this.convertRadarrToAddEvent(item));
  }

  private convertRadarrToAddEvent(radarr: Movie): AddEvent {
    const resultItemFormValue: ResultItemFormValue = this.formGroup.value;
    return {
      profileId: resultItemFormValue.profile,
      tmdbId: radarr.tmdbId,
    };
  }
}
