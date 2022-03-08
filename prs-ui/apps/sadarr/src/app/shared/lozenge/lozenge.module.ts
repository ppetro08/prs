import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LozengeIconDirective } from './lozenge-icon.directive';
import { LozengeComponent } from './lozenge.component';


@NgModule({
    imports: [CommonModule],
    declarations: [LozengeComponent, LozengeIconDirective],
    exports: [LozengeComponent, LozengeIconDirective],
})
export class LozengeModule { }
