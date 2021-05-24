import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IFriends } from '../models/friend.model';
import { IUser } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private activeFriend: IUser;

  constructor(protected http: HttpClient, private userService: UserService) {
    // this.getLastVisitedFriend().subscribe((activeFriend: IUser) => this.activeFriend = activeFriend);
  }

  setActiveFriend(user?: IUser): void {
    console.log(user);
    sessionStorage.setItem('lastFriendVisited', user.username)
    this.activeFriend = user;
  }

  getActiveFriend(): Observable<IUser>{
    return !!this.activeFriend ? of(this.activeFriend) : this.userService.getUser(sessionStorage.getItem('lastFriendVisited'));
  }

  getLastVisitedFriend(): Observable<any> {
    if (sessionStorage.getItem('lastFriendVisited')) {
      return this.userService.getUser(sessionStorage.getItem('lastFriendVisited'));
    } else {
      this.setActiveFriend(null);
      return of();
    }
  }

  createFriendsInfo(fullItem: object): Observable<any> {
    return this.http.post(environment.URL_API + '/friendsInfo', fullItem);
  }

  addFriend(userUsername: string, friendUsername: string): Observable<any> {
    return this.http.post(environment.URL_API + '/addFriend', {userUsername: userUsername, friendUsername: friendUsername});
  }

  deleteFriend(username: string, friend: string): Observable<any> {
    console.log("servicio");
    return this.http.post(environment.URL_API + '/deleteFriend', {friend: friend, owner: username});
  }

  sendFriendshipRequest(userUsername: string, friendUsername): Observable<any> {
    return this.http.post(environment.URL_API + '/sendFriensdhipRequest', {userUsername: userUsername, friendUsername: friendUsername});
  }

  deleteFriendshipRequest(userUsername: string, friendUsername): Observable<any> {
    return this.http.post(environment.URL_API + '/deleteFriendshipRequest', {userUsername: userUsername, friendUsername: friendUsername});
  }

  getAllFriends(userUsername: string): Observable<any> {
    return this.http.get(environment.URL_API + '/friends/'+userUsername);
  }

  getAllFriendshipRequests(userUsername: string): Observable<any> {
    return this.http.put(environment.URL_API + '/friendshipRequests', userUsername);
  }

  getFriendsInfo(username: string): Observable<any> {
    return this.http.get(environment.URL_API + '/friendsInfo/' + username)
  }
}
