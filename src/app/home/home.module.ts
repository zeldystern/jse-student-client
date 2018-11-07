import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ComingSoonComponent, HomeComponent],
  bootstrap: [ComingSoonComponent]
})
export class HomeModule { }
