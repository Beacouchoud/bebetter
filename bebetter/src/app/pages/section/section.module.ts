import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SectionPageRoutingModule } from './section-routing.module';

import { SectionPage } from './section.page';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ItemsComponent } from 'src/app/components/items/items.component';
import { NewItemFormComponent } from 'src/app/components/new-item-form/new-item-form.component';
import { EditItemFormComponent } from 'src/app/components/edit-item-form/edit-item-form.component';
import { EditRecordComponent } from 'src/app/components/edit-record/edit-record.component';
import { NewRecordComponent } from 'src/app/components/new-record/new-record.component';
import { ItemsReportsComponent } from 'src/app/components/items-reports/items-reports.component';
import { FriendsComponent } from 'src/app/components/friends/friends.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { UserSettingsComponent } from 'src/app/components/user-settings/user-settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SectionPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [
    NewItemFormComponent,
    SectionPage,
    HomeComponent,
    ItemsComponent,
    EditItemFormComponent,
    EditRecordComponent,
    NewRecordComponent,
    ItemsReportsComponent,
    FriendsComponent,
    ProfileComponent,
    UserSettingsComponent
  ]
})
export class SectionPageModule {}
