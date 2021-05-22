import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {

  public formUserData: FormGroup;
  public error: boolean;
  public errorCode: string;
  public msg: string;
  public formPassword: FormGroup;
  public error2: boolean;
  public errorCode2: string;
  public msg2: string;
  private user: IUser;

  constructor(private fb: FormBuilder, private utils: UtilsService, private userService: UserService) {
    utils.setEnableTitle(true);
  }

  ngOnInit() {
    this.user = this.userService.getLoggedUser();
    this.initFormUserData();
    this.initFormPassword();
  }

  private initFormUserData(): void {
    this.formUserData = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.email, Validators.required]]
    });
  }

  private initFormPassword(): void {
    this.formPassword = this.fb.group({
      oldPassword: [null, [Validators.minLength(8), Validators.required]],
      newPassword: [null, [Validators.minLength(8), Validators.required]]
    });
  }


  confirmChanges() {
    if (this.formUserData.valid) {
      //mandamos el item completo modificado
      this.user.name = this.formUserData.controls['name'].value;
      this.user.email = this.formUserData.controls['email'].value;
      this.userService.updateUser(this.user.username, this.user)
      .subscribe((user: IUser) =>
                        { this.user = user;
                          this.userService.setLoggedUser(user);},
                 (error) => console.log(error))
    } else {
      console.log(this.formUserData.controls) }
  }

  confirmNewPassword() {
    if (this.formPassword.valid) {
      this.userService.updateUserPwd(this.user.username, this.formPassword.getRawValue())
      .subscribe(
        (data) => {
          this.user = data.user;
          this.userService.setLoggedUser(data.user);
          console.log(data.msg)
        },
        (error) => console.log(error))
    } else {
      console.log(this.formUserData.controls)
    }
  }

}
