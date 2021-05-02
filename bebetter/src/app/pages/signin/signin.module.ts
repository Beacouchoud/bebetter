import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninPageRoutingModule } from './signin-routing.module';

import { SigninPage } from './signin.page';
import { UserService } from 'src/app/services/user.service';
import { ItemService } from 'src/app/services/item.service';
import { FriendService } from 'src/app/services/friend.service';
import { UtilsService } from 'src/app/services/utils.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SigninPageRoutingModule
  ],
  declarations: [SigninPage],
  providers: [UserService, ItemService, FriendService, UtilsService]
})
export class SigninPageModule {}
