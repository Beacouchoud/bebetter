import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.scss'],
})
export class EditRecordComponent implements OnInit {

  constructor(private utils: UtilsService) {
    utils.setEnableMenu(false);
    utils.setEnableTitle(false)
  }

  ngOnInit() {}

}
