import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private enableMenu: boolean;
  private enableTitle: boolean;

  constructor(protected http: HttpClient) { }

  public setEnableTitle(b: boolean) {
    this.enableTitle = b;
  }

  public getEnableTitle() {
    return this.enableTitle;
  }

  public setEnableMenu(b: boolean) {
    this.enableMenu = b;
  }

  public getEnableMenu() {
    return this.enableMenu;
  }

}
