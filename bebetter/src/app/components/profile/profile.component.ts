import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFriends } from 'src/app/models/friend.model';
import { IUser } from 'src/app/models/user.model';
import { FriendService } from 'src/app/services/friend.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  private friendsInfo: IFriends;
  private friendshipRequestsList: Array<IUser>;

  constructor(private fb: FormBuilder, private utils: UtilsService, private friendsService: FriendService, private userService: UserService) {
    this.friendsInfo = null;
    this.friendshipRequestsList = new Array();
  }

  ngOnInit() {
    this.utils.setEnableTitle(true);
    this.getFriendsInfo();
  }

  public get friendshipRequests() {
    return this.friendshipRequestsList;
  }

  public get userInfo() {
    return this.userService.getLoggedUser();
  }

  private getAllFriends() {
    this.friendsInfo.friendshipRequests.map(username => this.getFriendsUser(username));
  }

  private getFriendsUser(username: string){
    this.friendshipRequestsList = [];
    this.userService.getUser(username)
    .subscribe(
     (friend) => {
       console.log(friend);
       this.friendshipRequestsList.push(friend);
     },
     (error) => console.log(error)
   );

 }

  private getFriendsInfo(): void {
    this.friendsService.getFriendsInfo(this.userInfo?.username).subscribe(
      (info) => {
        this.friendsInfo = info;
        console.log(info);
        this.getAllFriends();
      },
      (error) => console.log(error)
      );
  }

  public discardRequest(username: string) {
    this.friendsService.deleteFriendshipRequest(this.userInfo.username, username).subscribe(
      (info) => {
        this.friendshipRequestsList = [];
        console.log(info);
        this.getFriendsInfo();
      },
      (error) => console.log(error)
    );
  }

  public acceptRequest(username: string) {
    this.friendsService.addFriend(this.userInfo.username, username).subscribe(
      (info) => {
        this.discardRequest(username);
        console.log(info);
      },
      (error) => console.log(error)
    );
  }

}
