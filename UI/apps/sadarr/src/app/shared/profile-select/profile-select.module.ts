import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ProfileSelectComponent } from './profile-select.component';


@NgModule({
    imports: [CommonModule, MatSelectModule],
    exports: [ProfileSelectComponent],
    declarations: [ProfileSelectComponent],
})
export class ProfileSelectModule { }
