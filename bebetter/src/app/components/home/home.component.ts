import { Component, OnInit } from '@angular/core';
import { IDetailItem, IItem } from 'src/app/models/item.model';
import { IUser } from 'src/app/models/user.model';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  private user: IUser;
  private item: IItem;
  private privateItems: Boolean;

  constructor(private utils: UtilsService, private itemService: ItemService, private userService: UserService) {
    this.item = null;
    this.privateItems = true;
    this.utils.setEnableTitle(true);
  }

  ngOnInit() {
    this.utils.setEnableTitle(true);
    this.user = this.userService.getLoggedUser();
    this.getItem();
  }

  changeList() {
    this.privateItems = !this.privateItems;
    this.getItem();
  }

  private getItem(): void {
    this.itemService.getFullItem (this.user.username)
    .subscribe(
      (item) => {
        this.item = item;
        this.itemService.setActiveItem(item);
      },
      (error) => console.log(error)
    );
  }

  public get itemsFiltered(): Array<IDetailItem> {
    return this.item?.userItems.filter(item => item.private === this.privateItems)
  }
}
