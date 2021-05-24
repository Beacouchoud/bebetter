import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { FriendService } from 'src/app/services/friend.service';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public user: IUser;
  public form: FormGroup;
  public error: boolean;
  public errorCode: string;
  public msg: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private utils: UtilsService,
    private itemService: ItemService,
    private friendService: FriendService
  ) {
    utils.setEnableMenu(true);
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: [
        !this.user ? null : this.user.username,
        [Validators.pattern('[a-zA-ZÑñ ]*'), Validators.required],
      ],
      name: [
        !this.user ? null : this.user.name,
        [Validators.pattern('[a-zA-ZÑñ ]*'), Validators.required],
      ],
      email: [
        !this.user ? null : this.user.email,
        [Validators.email, Validators.required],
      ],
      password: [
        !this.user ? null : this.user.password,
        [Validators.minLength(8), Validators.required],
      ],
    });
  }

  public signup(): void {
    if (this.form.valid) {
      this.userService.createUser(this.form.getRawValue()).subscribe(
        (usu) => {
          this.user = usu.user;
          this.itemService
            .createFullItem({ owner: this.user.username, userItems: [] })
            .subscribe(
              (item) => console.log(item),
              (error) => console.log(error)
            );
          this.friendService
            .createFriendsInfo({
              owner: this.user.username,
              friends: [],
              friendshipRequests: [],
            })
            .subscribe(
              (info) => console.log(info),
              (error) => console.log(error)
            );
          this.router.navigate(['/signin']);
        },
        (error) => this.handleError(error)
      );
    }
  }

  public hasError(formControlName: string): boolean {
    return (
      this.form.controls[formControlName].errors &&
      this.form.controls[formControlName].dirty
    );
  }

  handleError(error: HttpErrorResponse) {
    this.errorCode = error.error.code;
    if (this.errorCode === 'ER_DUP_ENTRY') {
      //cambiar
      this.msg = 'The email or username is already in use';
    } else {
      this.msg = error.error.message;
    }
    this.error = true;
  }
}
