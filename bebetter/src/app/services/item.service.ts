import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IItem } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(protected http: HttpClient) { }

  createItem(item: IItem): Observable<any> {
    return this.http.post(environment.URL_API + '/createItem', item);
  }

  editItem(keys: Array<any>, values: Array<any>) { //TO-DO
  }

  getItem(id: string): Observable<any>{
    return this.http.post(environment.URL_API + '/getItem', id);
  }

  getItemsList(): Observable<any> {
    return this.http.get(environment.URL_API + '/listItems').pipe(
      map(items => items as Array<IItem>)
    );
  }

  getRecordsFromItem(id: string): Observable<any> {
    return this.http.get(environment.URL_API + '/getRecordsFromItem', {params: {'id': id } } ).pipe(
      // map(records => escords as Array<IRecord>)
    );
  }

  updateMenu(id: string, item: IItem): Observable<any> {
    return this.http.post(environment.URL_API + '/updateItem', {item, id});
  }
}
