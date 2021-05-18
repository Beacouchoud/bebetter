import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private utils: UtilsService) {
    utils.setEnableTitle(true);
  }

  ngOnInit() {
    this.initFormUserData();
    this.initFormPassword();
  }

  private initFormUserData(): void {
    this.formUserData = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]]
    });
  }

  private initFormPassword(): void {
    this.formPassword = this.fb.group({
      oldPassword: [null, [Validators.minLength(8), Validators.required]],
      newPassword: [null, [Validators.minLength(8), Validators.required]]
    });
  }


  confirmChanges() {

  }

  confirmNewPassword() {

  }

}
