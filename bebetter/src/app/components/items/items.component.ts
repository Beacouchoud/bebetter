import { Component, Input, OnInit } from '@angular/core';
import { IDetailItem, IItem } from 'src/app/models/item.model';
import { IRecord } from 'src/app/models/record.model';
import { ItemService } from 'src/app/services/item.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {


  @Input() public itemDetail: IDetailItem;


  constructor(private utils: UtilsService, private itemService: ItemService) {
    utils.setEnableTitle(true);
  }

  ngOnInit() {

  }

  public setDetailItemId(): void {
    this.itemService.setActiveDetailItem(this.itemDetail);
  }

  public get record(): IRecord {
    return this.itemDetail?.records[0];
  }

}
