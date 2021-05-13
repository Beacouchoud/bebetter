import { Component } from '@angular/core';
import { UtilsService } from './services/utils.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appSections = [
    { title: 'Home', url: '/section/Home', icon: 'mail' },
    { title: 'Reports', url: '/section/Reports', icon: 'paper-plane' },
    { title: 'Friends', url: '/section/Friends', icon: 'heart' },
    { title: 'My Profile', url: '/section/Profile', icon: 'archive' },
    { title: 'Settings', url: '/section/Settings', icon: 'warning' },
  ];

  private menu: boolean;

  constructor(private utils: UtilsService) {
  }

  public get showMenu () {
    return this.utils.enableMenu;
  }

}
