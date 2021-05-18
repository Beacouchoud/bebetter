import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { IDetailItem, IItem } from 'src/app/models/item.model';
import { IUser } from 'src/app/models/user.model';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
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
  private itemDetail: IDetailItem;
  private item: IItem;
  private user: IUser;
  private owner: string;

  constructor(private utils: UtilsService, private formBuilder: FormBuilder,
    private activateRouter: ActivatedRoute, private itemService: ItemService,
    private userService: UserService, private router: Router ) {
    utils.setEnableTitle(false);
    this.user = userService.getLoggedUser();
    this.owner = this.user.username;
  }


  ngOnInit() {
    this.getItem();
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      _id: [this.itemDetail._id],
      title: [this.itemDetail.title, [Validators.required]],
      subtitle: [this.itemDetail.subtitle, [Validators.required]],
      description: [this.itemDetail.description, [Validators.required, Validators.maxLength(500)]],
      um: [this.itemDetail.um, [Validators.required]],
      objective: [this.itemDetail.objective, [Validators.required]],
      private: [this.itemDetail.private],
      records: [this.itemDetail.records],
      type: [this.itemDetail.graph]
    });
  }

  private getItem(): void {
    this.itemService.getActiveItem(this.user.username).subscribe(item => this.item = item);
    this.activateRouter.paramMap.subscribe(paramsMap =>
      this.itemService.getDetailItem(paramsMap.get('id'), this.owner)
       .subscribe(itemDetail => this.itemDetail = itemDetail)
      );
  }

  public editItem() {
    console.log("prueba")
    if (this.form.valid) {
      //mandamos el item completo modificado
      this.getItem();
      console.log("mandamos el item modificado:")
      this.item.userItems.forEach((item, i) => {
         if (item._id === this.itemDetail._id) {
           this.item.userItems[i] = this.form.getRawValue();
          };
        });
      console.log(this.item);
      this.itemService.editItem(this.item)
      .subscribe((item: IItem) => {
                                  this.item = item;
                                  this.router.navigate(['../../ViewItem/'+this.itemDetail._id], {relativeTo: this.activateRouter});}, //TODO comprobar si el elemento que se carga esta actualizado
                                  (error) => console.log(error));
    } else {
      console.log(this.form.controls) }
  }

  public changePrivacity() {
    this.itemDetail.private = !this.itemDetail.private;
    console.log(this.itemDetail.private);
  }

}
