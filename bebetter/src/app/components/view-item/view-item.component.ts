import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { IonList, ModalController } from '@ionic/angular';
import { IDetailItem, IItem } from 'src/app/models/item.model';
import { IUser } from 'src/app/models/user.model';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent implements OnInit {
  private itemDetail: IDetailItem;
  private item: IItem;
  private user: IUser;
  private owner: string;
  private date: Date;
  public value: number;
  @ViewChild(IonList) list: IonList;

  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    public modalController: ModalController,
    private utils: UtilsService,
    private itemService: ItemService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.utils.setEnableTitle(true);
    this.user = this.userService.getLoggedUser();
    this.owner = this.user.username;
    this.date = new Date();
    this.getItem();
    this.value = 0;
  }

  get itemDetails() {
    this.itemDetail.records.sort((a, b) => new Date(b.date).getTime()-new Date(a.date).getTime() );
    return this.itemDetail;
  }

  private getItem(): void {
    this.itemService
      .getActiveItem(this.user.username)
      .subscribe((item) => {
        this.item = item;
        this.itemDetail = item.userItems.filter(itemDetail => itemDetail._id === this.itemService.getActiveDetailItem())[0];
      });
    if(!!this.itemDetail) {
      this.activateRouter.paramMap.subscribe((paramsMap) =>
      this.itemService
        .getDetailItem(paramsMap.get('id'), this.owner)
        .subscribe((itemDetail) => (this.itemDetail = itemDetail))
      );
    }
  }

  public navigateToEditItem(): void {
    this.router.navigate(['../../EditItem/' + this.itemDetail._id], {
      relativeTo: this.activateRouter,
    });
  }

  public deleteItemDetails(id: string) {
    this.item.userItems = this.item.userItems.filter(
      (itemDetail) => itemDetail._id !== id
    );
    this.itemService.editItem(this.item).subscribe(
      (itemDeleted) => {
        console.log(itemDeleted);
        this.router.navigateByUrl('');
      },
      (error) => console.log(error)
    );
  }

  public openDialog(): void {
    console.log('abrir');
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        date: this.date,
        value: this.value,
        type: 'number',
        text: 'Register value - ',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('valor', result);
      this.value = result;
      if (
        this.value !== null &&
        this.value !== undefined &&
        this.value.toString().length > 0
      ) {
        this.addRecord({value: this.value, date: this.date });
      }
      this.value = 0;
    });
  }

  private addRecord(record: any) {
    //editamos el item completo y lo enviamos a la api para guardarlo modificado
    // this.item.userItems.forEach((itemDetail) => {
    //   if (itemDetail._id === this.itemDetail._id) {
    //     this.itemDetail.records.unshift({_id: null,value: record.value, date: this.date}) ;} });

    // this.itemService.editItem(this.item).subscribe(
    //   (item) => {
    //     console.log(item);
    //     this.getItem();
    //   },
    //   (error) => console.log(error)
    // );
    console.log(this.user.username, this.itemDetail._id, record);
    //TODO arreglar no actualiza despues el itemDetail
    this.itemService.addRecord(this.user.username, this.itemDetail._id, record).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    // this.itemService.getDetailItem(this.itemDetail._id).subscribe(
    //   (itemDetail) => {
    //     console.log(itemDetail);
    //     this.itemDetail = itemDetail;
    //     !!this.itemDetail ? this.getItem() : this.itemDetail;
    //   }
    // );
    !!this.item
    ? this.getItem()
    : this.itemDetail = this.item.userItems.filter(detailItem => detailItem._id === this.itemService.getActiveDetailItem())[0];
  }

  public deleteRecord(index: number) {
    // this.itemDetails.records.splice(index, 1);
    this.item.userItems.map((itemDetail) => {
      if (itemDetail._id === this.itemDetail._id) {
        itemDetail.records.splice(index, 1);
      }
    });
    console.log(this.item);
    this.itemService.editItem(this.item).subscribe(
      (item) => {
        console.log(item);
        this.getItem();
      },
      (error) => console.log(error)
    );
  }

}
