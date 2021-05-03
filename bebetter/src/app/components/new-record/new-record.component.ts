import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.scss'],
})
export class NewRecordComponent implements OnInit {

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
