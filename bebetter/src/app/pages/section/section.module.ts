import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SectionPageRoutingModule } from './section-routing.module';

import { SectionPage } from './section.page';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ItemsComponent } from 'src/app/components/items/items.component';
import { RecordsComponent } from 'src/app/components/records/records.component';
import { NewItemFormComponent } from 'src/app/components/new-item-form/new-item-form.component';
import { EditItemFormComponent } from 'src/app/components/edit-item-form/edit-item-form.component';
import { EditRecordComponent } from 'src/app/components/edit-record/edit-record.component';
import { NewRecordComponent } from 'src/app/components/new-record/new-record.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SectionPageRoutingModule
  ],
  declarations: [
    NewItemFormComponent,
    SectionPage,
    HomeComponent,
    ItemsComponent,
    RecordsComponent,
    EditItemFormComponent,
    EditRecordComponent,
    NewRecordComponent
  ]
})
export class SectionPageModule {}
