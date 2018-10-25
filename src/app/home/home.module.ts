import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ComingSoonComponent],
  bootstrap: [ComingSoonComponent]
})
export class HomeModule { }
