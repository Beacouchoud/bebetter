import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IFriends } from '../models/friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(protected http: HttpClient) { }

  addFriend(friend: string): Observable<any> {
    return this.http.post(environment.URL_API + '/addFriend', friend);
  }

  deleteFriend(friend: string): Observable<any> {
    return this.http.put(environment.URL_API + '/friend', friend);
  }

  sendFriendshipRequest(userUsername: string, friendUsername): Observable<any> {
    return this.http.put(environment.URL_API + '/sendFriensdhipRequest', {userUsername: userUsername, friendUsername: friendUsername});
  }

  deleteFriendshipRequest(userUsername: string, friendUsername): Observable<any> {
    return this.http.put(environment.URL_API + '/deleteFrienshipRequest', {userUsername: userUsername, friendUsername: friendUsername});
  }

  getAllFriends(userUsername: string): Observable<any> {
    return this.http.put(environment.URL_API + '/friends', userUsername);
  }

  getAllFriendshipRequests(userUsername: string): Observable<any> {
    return this.http.put(environment.URL_API + '/friendshipRequests', userUsername);
  }
}
