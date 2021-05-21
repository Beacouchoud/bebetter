import { Component, Inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IDetailItem, IItem } from 'src/app/models/item.model';
import { IUser } from 'src/app/models/user.model';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { IRecord } from 'src/app/models/record.model';

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
  }

  get itemDetails() {
    return this.itemDetail;
  }

  private getItem(): void {
    this.itemService
      .getActiveItem(this.user.username)
      .subscribe((item) => (this.item = item));
    this.activateRouter.paramMap.subscribe((paramsMap) =>
      this.itemService
        .getDetailItem(paramsMap.get('id'), this.owner)
        .subscribe((itemDetail) => (this.itemDetail = itemDetail))
    );
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
      data: { date: this.date, value: this.value, type: 'number', text: 'Register value' },
    });
//TODO no recoge el valor del input bien
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.value = result;
      this.addRecord({ _id: null, value: this.value, date: this.date });
      // console.log(this.value);
    });
  }

  private addRecord(record: IRecord) {
    //editamos el item completo y lo enviamos a la api para guardarlo modificado
    this.item.userItems.forEach((itemDetail) => {
      if (itemDetail._id === this.itemDetail._id) {
        this.itemDetail.records.push({
          _id: null,
          value: record.value,
          date: this.date,
        });
      }
    });
    this.itemService.editItem(this.item).subscribe(
      (item) => {
        console.log(item);
        this.getItem();
      },
      (error) => console.log(error)
    );
  }

  public deleteRecord(id: string) {
    this.item.userItems
    .map((itemDetail) => {
      if (itemDetail._id === this.itemDetail._id) {
        this.itemDetail.records.splice(
          this.itemDetail.records.findIndex((record) => record._id === id), 1
        );
      }
    });
    this.itemService.editItem(this.item).subscribe(
      (item) => {
        console.log(item);
        this.getItem();
      },
      (error) => console.log(error)
    );
  }

  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: NewRecordComponent,
  //     cssClass: 'new-record'
  //   });

  //   this.handleModalDismiss(modal);
  //   return await modal.present();
  // }

  // private async handleModalDismiss(modal) {
  //   const { data } = await modal.onWillDismiss();
  // console.log(data);
  // }
}
