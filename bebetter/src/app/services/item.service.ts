import { HttpClient } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IItem } from '../models/item.model';
import { IRecord } from '../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(protected http: HttpClient) { }

  createItem(item: IItem): Observable<any> {
    return this.http.post(environment.URL_API + '/item', item);
  }

  editItem(item: IItem): Observable<any> { 
    return this.http.put(environment.URL_API + '/item', item);
  }

  getItem(id: string): Observable<any>{
    return this.http.get(environment.URL_API + '/getItem/' + id);
  }

  getPublicItemsList(owner: string): Observable<any> {
    return this.http.get(environment.URL_API + '/PublicItems/' + owner).pipe(
      map(items => items as Array<IItem>)
    );
  }

  getPrivateItemsList(owner: string): Observable<any> {
    return this.http.get(environment.URL_API + '/PrivateItems/' + owner).pipe(
      map(items => items as Array<IItem>)
    );
  }
//revisar
  getRecordsFromItem(id: string): Observable<any> {
    return this.getItem('id').pipe(
       map(item => item.records as Array<IRecord>)
    );
  }

}
