import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IRecord } from '../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class RecordService {


  constructor(protected http: HttpClient) { }

  createRecord(record: IRecord): Observable<any> {
    return this.http.post(environment.URL_API + '/createRecord', record);
  }

  listRecords(): Observable<Array<IRecord>> {
    return this.http.get(environment.URL_API + '/listRecords').pipe(
      map(records => records as Array<IRecord>)
    );
  }

  deleteRecord(id: string): Observable<any> {
    return this.http.post(environment.URL_API + '/deleteRecord', {id});
  }

  updateRecord(id: string, record: IRecord): Observable<any> {
    return this.http.post(environment.URL_API + '/updateRecord', {record, id});
  }
}

//borrar?? accedoa a record desde cada item, servicio innecesario