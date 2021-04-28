import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedUser: IUser;

  constructor(protected http: HttpClient) {
    // this.getActiveUser().subscribe((loggedUser: IUsuario) => this.loggedUser = loggedUser);
  }

  getLoggedUser(): IUser {
    return this.loggedUser;
  }

  createUsuario(usuario: IUser): Observable<any> {
    return this.http.post(environment.URL_API + '/register', usuario);
  }

  updateUsuario(id: string, usuario: IUser): Observable<any> {
    return this.http.post(environment.URL_API + '/updateUser', {id, usuario});
  }

  updatePwd(id: string, data: any): Observable<any> {
    return this.http.post(environment.URL_API + '/updatePwd', {id, newPassword: data.newPassword1, oldPassword: data.password});
  }

  login(user: any): Observable<any> {
    // return this.http.post(environment.URL_API + '/login', user).pipe(
    //   map((loggedUser: IUsuario) => {
    //     sessionStorage.setItem('token', loggedUser.sessionId);
    //     return this.loggedUser = loggedUser;
    //   })
    // );
    return of(true);
  }

  logout(): Observable<any> {
    return this.http.get(environment.URL_API + '/logout',{
      withCredentials: true}).pipe(map(res => {
        this.loggedUser = null;
        sessionStorage.removeItem('token');
        return res;
      }));
  }

  getActiveUser(): Observable<any> {
    if (sessionStorage.getItem('token')) {
      return this.http.post(environment.URL_API + '/activeUser', {token: sessionStorage.getItem('token')});
    } else {
      return this.logout();
    }
  }
}
