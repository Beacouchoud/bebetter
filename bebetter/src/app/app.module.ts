import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './services/user.service';
import { ItemService } from './services/item.service';
import { FriendService } from './services/friend.service';
import { UtilsService } from './services/utils.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, DialogComponent],
  entryComponents: [DialogComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              UserService, ItemService, FriendService, UtilsService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptorService,
                multi: true
              }
             ,{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill', floatLabel: 'always' }}
            ],
  exports:[],
  bootstrap: [AppComponent],
})
export class AppModule {}
