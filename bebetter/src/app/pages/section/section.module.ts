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
import { ViewItemComponent } from 'src/app/components/view-item/view-item.component';
import { OverviewComponent } from 'src/app/components/overview/overview.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FriendItemsComponent } from 'src/app/components/friend-items/friend-items.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SectionPageRoutingModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,

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
    UserSettingsComponent,
    ViewItemComponent,
    OverviewComponent,
    FriendItemsComponent
  ],
  entryComponents: [],

})
export class SectionPageModule {}
