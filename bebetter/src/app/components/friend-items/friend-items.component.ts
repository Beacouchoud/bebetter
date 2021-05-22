import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-friend-items',
  templateUrl: './friend-items.component.html',
  styleUrls: ['./friend-items.component.scss'],
})
export class FriendItemsComponent implements OnInit {

  private visitedFriend: IUser;

  constructor(private friendService: FriendService) {
    this.visitedFriend = null;
   }

  ngOnInit() {
    this.friendService.getActiveFriend().subscribe(
      (friend) => this.visitedFriend = friend,
      (error) => console.log(error)
    );
  }

  public get friend() {
    return this.visitedFriend;
  }

}
