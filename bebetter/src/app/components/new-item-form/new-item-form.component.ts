import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.scss'],
})
export class NewItemFormComponent implements OnInit {

  public title = "New Item";
  public form: FormGroup;
  public error: boolean;
  public msg: string;

  constructor(private formBuilder: FormBuilder, private utils: UtilsService) {
    utils.enableTitle = false;
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.pattern("[A-Za-z0-9Ññ._%+-]")]],
      subtitle: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.maxLength(500)]],
      um: [null, [Validators.required]],
      type: [null, [Validators.required]],
      date: [null, [Validators.required]],
      objective: [null, [Validators.required]]
    });
  }

  public createItem() {

  }
}
