import { HttpClient } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDetailItem, IItem } from '../models/item.model';
import { IRecord } from '../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private activeItem: IItem;
  private activeDetailItem: IDetailItem;

  constructor(protected http: HttpClient) { }

  createItem(item: IItem): Observable<any> {
    return this.http.post(environment.URL_API + '/item', item);
  }

  editItem(item: IItem): Observable<any> {
    return this.http.put(environment.URL_API + '/item', item);
  }

  setActiveItem(item: IItem): void {
    sessionStorage.setItem('lastItem', item._id)
    this.activeItem = item;
  }

  getActiveItem(owner: string): Observable<IItem>{
    return !!this.activeItem ? of(this.activeItem) : this.getFullItem(owner);
  }

  getDetailItem(id: string, owner?: string): Observable<IDetailItem> {
    if(this.activeItem)
      return of(this.activeItem.userItems.find(item => item._id == id));
    else {
      return this.getActiveItem(owner).pipe(map(item => item.userItems.find(item => item._id == id)));
      // return this.activeItem.userItems.find(item => item._id == id);
    }
  }

  setActiveDetailItem(itemDetail: IDetailItem): void {
    sessionStorage.setItem('lastDetailItem', itemDetail._id)
    this.activeDetailItem = itemDetail;
  }

  // getItem(id: string): Observable<any>{
  //   return this.http.get(environment.URL_API + '/getItem/' + id);
  // }

  getFullItem(owner: string): Observable<IItem> {
    return this.http.get<IItem>(environment.URL_API + '/getFullItem/' + owner);
  }

  // getPrivateItemsList(owner: string): Observable<any> {
  //   return this.http.get(environment.URL_API + '/privateItems/' + owner).pipe(
  //     map(items => items as Array<IItem>)
  //   );
  // }

//TODO revisar
  // getRecordsFromItem(id: string): Observable<any> {
  //   return this.getItem('id').pipe(
  //      map(item => item.records as Array<IRecord>)
  //   );
  // }

}
