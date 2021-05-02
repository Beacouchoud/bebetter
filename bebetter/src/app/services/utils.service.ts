import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public enableMenu: boolean;

  constructor(protected http: HttpClient) { }

}
