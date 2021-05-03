import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-item-form',
  templateUrl: './edit-item-form.component.html',
  styleUrls: ['./edit-item-form.component.scss'],
})

export class EditItemFormComponent implements OnInit {

  public form: FormGroup;
  public error: boolean;
  public msg: string;

  constructor(private utils: UtilsService, private formBuilder: FormBuilder) {
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
      objective: [null, [Validators.required]]
    });
  }

  public editItem() {

  }

}
