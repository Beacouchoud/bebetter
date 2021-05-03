import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public user: IUser;
  public form: FormGroup;
  public error: boolean;
  public errorCode: string;
  public msg: string;


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private utils: UtilsService) {
    utils.enableMenu = false;
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(8), Validators.required]]
    });
  }

  public login(): void {
    if (this.form.valid) {
      this.router.navigate(['/section/Home']);
      this.userService.login(this.form.getRawValue())
      .subscribe(
        (usu: any) => {
          if (usu.habilitado === 1) {
            this.user = usu;
            this.router.navigate(['/section/Home']);
          } else {
            this.msg = 'Email or password incorrect';
            this.error = true;
          }
        },
        (error) => {this.handleError(error)}
      );
    } else {
      this.msg = 'Please, fill all the fields correctly';
      this.error = true;
    }
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    this.errorCode = error.error.code;
    this.msg = error.error.message;
    this.error = true;
  }



}
