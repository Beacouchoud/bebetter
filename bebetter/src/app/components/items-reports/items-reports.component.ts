import { Component, OnInit } from '@angular/core';
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
  private user: IUser;
  private item: IItem;

  constructor(private utils: UtilsService, private itemService: ItemService, private userService: UserService) {
    this.user = null;
    this.item = null;
  }

  ngOnInit() {
    this.utils.setEnableTitle(true);
    this.user = this.userService.getLoggedUser();
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
