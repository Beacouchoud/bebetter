import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedUser: IUser;

  constructor(protected http: HttpClient, private router: Router) {
    this.getActiveUser().subscribe((loggedUser: IUser) => this.loggedUser = loggedUser);
  }

  getLoggedUser(): IUser {
    return this.loggedUser;
  }

  createUser(user: IUser): Observable<any> {
    return this.http.post(environment.URL_API + '/signup', user);
  }

  setLoggedUser(user: IUser): void {
    this.loggedUser = user;
  }

  login(user: any): Observable<any> {
    return this.http.post(environment.URL_API + '/login', user).pipe(
      map((loggedUser: any) => {
        localStorage.setItem('token', loggedUser.accessToken);
        localStorage.setItem('username', loggedUser.user.username);
        this.setLoggedUser(loggedUser.user);
        return loggedUser.user;
      })
    );
  }

  getUser(id: string): Observable<any> {
    return this.http.get(environment.URL_API + '/users/'+id);
  }

  updateUser(id: string, user: IUser): Observable<any> {
    return this.http.put(environment.URL_API + '/updateUser', {id, user});
  }

  updateUserPwd(username: string, data: any): Observable<any> {
    return this.http.post(environment.URL_API + '/updatePwd', {username, newPassword: data.newPassword, oldPassword: data.oldPassword});
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(environment.URL_API + '/deleteUser/'+id);
  }

  logout(): void {
    this.loggedUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigateByUrl('/signin');
  }

  getActiveUser(): Observable<any> {
    if (localStorage.getItem('username')) {
      return this.getUser(localStorage.getItem('username'));
    } else {
      this.logout();
      return of();
    }
  }
}
