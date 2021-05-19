import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IItem } from 'src/app/models/item.model';
import { IRecord } from 'src/app/models/record.model';
import { IUser } from 'src/app/models/user.model';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
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
  private item: IItem;
  private user: IUser;

  constructor(private formBuilder: FormBuilder,
    private utils: UtilsService,
    private itemService: ItemService,
    private userService: UserService,
    private router: Router) {
    utils.setEnableTitle(false);
    this.user = userService.getLoggedUser();
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      owner: [this.user.username],
      title: ["Otras Pruebas", [Validators.required]],
      subtitle: ["Primeras pruebas", [Validators.required]],
      description: ["Seguimiento del número de pruebas de la aplicación", [Validators.required, Validators.maxLength(500)]],
      records: [[null]],
      um: ["Pruebas", [Validators.required]],
      type: [null, [Validators.required]],
      date: [null, [Validators.required]],
      objective: [4, [Validators.required]],
      private: [true]
    });
  }

  public createItem() {
    if (this.form.valid) {
      console.log("form valido")
      this.itemService.createItem(this.form.getRawValue())
      .subscribe((item: IItem) => {
                                  this.item = item;
                                  console.log(item);
                                  this.router.navigate(['../viewItem/'+item._id]);
                                },
                                  (error) => this.handleError(error));
    } else {
      console.log("form invalido")
    }
  }

  public hasError(formControlName: string): boolean {
    return this.form.controls[formControlName].errors && this.form.controls[formControlName].dirty;
  }

  handleError(error: HttpErrorResponse) {
    this.msg = error.error.message;
    this.error = true;
    console.log(this.msg, this.error);
  }
}
