import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SectionPageRoutingModule } from './section-routing.module';

import { SectionPage } from './section.page';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ItemsComponent } from 'src/app/components/items/items.component';
import { RecordsComponent } from 'src/app/components/records/records.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SectionPageRoutingModule
  ],
  declarations: [
    SectionPage,
    HomeComponent,
    ItemsComponent,
    RecordsComponent
  ]
})
export class SectionPageModule {}
