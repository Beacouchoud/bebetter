import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewRecordComponent } from '../new-record/new-record.component';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent implements OnInit {

  constructor(private router: Router, private activateRouter: ActivatedRoute, public modalController: ModalController) { }

  ngOnInit() {}

  public goToEdit(): void {
    this.router.navigate(['../../EditItem/7'], {relativeTo: this.activateRouter});
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewRecordComponent,
      cssClass: 'new-record'
    });

    this.handleModalDismiss(modal);
    return await modal.present();
  }

  private async handleModalDismiss(modal) {
    const { data } = await modal.onWillDismiss();
  console.log(data);
  }



}
