import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeavyComponent } from './heavy.component';

@NgModule({
  declarations: [HeavyComponent],
  imports: [
    CommonModule
  ],
  exports: [HeavyComponent]
})
export class HeavyModule { }
