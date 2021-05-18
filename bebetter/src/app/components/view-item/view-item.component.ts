import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IDetailItem, IItem } from 'src/app/models/item.model';
import { IUser } from 'src/app/models/user.model';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { NewRecordComponent } from '../new-record/new-record.component';

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

  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    public modalController: ModalController,
    private utils: UtilsService,
    private itemService: ItemService,
    private userService: UserService) {
      utils.setEnableTitle(true);
      this.user = userService.getLoggedUser();
      this.owner = this.user.username;
  }

  ngOnInit() {
    this.getItem();
  }

  get itemDetails(){
    return this.itemDetail;
  }

  private getItem(): void {
    this.activateRouter.paramMap.subscribe(paramsMap =>
       this.itemService.getDetailItem(paramsMap.get('id'), this.owner)
        .subscribe(itemDetail => this.itemDetail = itemDetail)
       );
  }

  public navigateToEditItem(): void {
    this.router.navigate(['../../EditItem/'+this.itemDetail._id], {relativeTo: this.activateRouter});
  }

  public deleteItemDetails(id: string) {}

  public deleteRecord(id: string) {}

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
