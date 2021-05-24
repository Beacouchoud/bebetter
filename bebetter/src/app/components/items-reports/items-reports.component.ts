import { Component, Input, OnInit } from '@angular/core';
import { IDetailItem, IItem } from 'src/app/models/item.model';
import { IUser } from 'src/app/models/user.model';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-items-reports',
  templateUrl: './items-reports.component.html',
  styleUrls: ['./items-reports.component.scss'],
})
export class ItemsReportsComponent implements OnInit {

  public panelOpenState: false;
  @Input() public user: IUser;
  @Input() public item: IItem;
  // private user: IUser;
  // private item: IItem;

  constructor(private utils: UtilsService, private itemService: ItemService, private userService: UserService) {
  }

  ngOnInit() {
    this.utils.setEnableTitle(true);
    this.user =  !!this.user ?  this.user : this.userService.getLoggedUser();
    this.getItem();
  }

  public get items(): Array<IDetailItem> {
    return this.item?.userItems;
  }


  private getItem(): void {
    this.itemService.getFullItem(this.user.username)
    .subscribe(
      (item) => {
        this.item = item;
      },
      (error) => console.log(error)
    );
  }
}
