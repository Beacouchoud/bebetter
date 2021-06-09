import { HttpClient } from '@angular/common/http';
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

  createFullItem(fullItem: object): Observable<any> {
    return this.http.post(environment.URL_API + '/fullItem', fullItem);
  }

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
      if(!!owner) {owner = localStorage.getItem('username');}
      return this.getActiveItem(owner).pipe(map(item => item.userItems.find(item => item._id == id)));
    }
  }

  setActiveDetailItem(itemDetail: IDetailItem): void {
    sessionStorage.setItem('lastDetailItem', itemDetail._id)
    this.activeDetailItem = itemDetail;
  }

  getActiveDetailItem() :string {
    return sessionStorage.getItem('lastDetailItem');
  }

  getFullItem(owner: string): Observable<IItem> {
    return this.http.get<IItem>(environment.URL_API + '/getFullItem/' + owner);
  }

  addRecord(owner: string, itemDetailId: string, record: IRecord): Observable<any> {
    console.log('servicio:', owner, itemDetailId, record);
    return this.http.post(environment.URL_API + '/addNewRecord', {'owner': owner, 'itemDetailsId': itemDetailId, 'record': {'value': record.value, 'date': record.date}});
  }

}
