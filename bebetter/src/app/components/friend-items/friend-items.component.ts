import { Component, OnInit } from '@angular/core';
import { IDetailItem, IItem } from 'src/app/models/item.model';
import { IUser } from 'src/app/models/user.model';
import { FriendService } from 'src/app/services/friend.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-friend-items',
  templateUrl: './friend-items.component.html',
  styleUrls: ['./friend-items.component.scss'],
})
export class FriendItemsComponent implements OnInit {

  private visitedFriend: IUser;
  // private itemDetails: Array<IDetailItem>;
  private item: IItem;

  constructor(private friendService: FriendService, private itemService: ItemService) {
    this.visitedFriend = null;
   }

  ngOnInit() {
    this.friendService.getActiveFriend().subscribe(
      (friend) => {
        this.visitedFriend = friend;
        this.itemService.getFullItem(friend.username).subscribe(
          (item) => this.item = item,
          (error) => console.log(error)
        );},
      (error) => console.log(error)
    );
  }

  public get friend(): IUser {
    return this.visitedFriend;
  }
  public get friendItems(): IItem {
    return !!this.item ? ({...this.item, userItems: this.item.userItems?.filter(item =>item?.private === false)}) : null;
  }

}
