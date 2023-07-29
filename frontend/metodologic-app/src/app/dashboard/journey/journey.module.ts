import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JourneyRoutingModule } from './journey-routing.module';
import { JourneyComponent } from './journey/journey.component';
import { JourneyItemComponent } from './journey/components/journey-item/journey-item.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    JourneyComponent,
    JourneyItemComponent
  ],
  imports: [
    CommonModule,
    JourneyRoutingModule,
    MatGridListModule,
    FlexLayoutModule
  ]
})
export class JourneyModule {

}
