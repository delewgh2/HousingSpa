import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup;
  user: User;
  userSubmitted: boolean;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    /* this.registrationForm = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        confirmEmail: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    }, [this.confirmEmailValidator, this.confirmPasswordValidator]) */
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      confirmEmail: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    }, {validators: [this.confirmEmailValidator, this.confirmPasswordValidator]})
  }

  confirmEmailValidator(fg: FormGroup): Validators {
    return fg.get('email').value === fg.get('confirmEmail').value ? null :
    {emailnotmatched: true};
  }
  confirmPasswordValidator(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value ? null :
    {passwordnotmatched: true};
  }

  // ------------------------------------
  // Getter methods for all form controls
  // ------------------------------------
  get name() {
    return this.registrationForm.get('name') as FormControl;
  }
  get email() {
    return this.registrationForm.get('email') as FormControl;
  }
  get confirmEmail() {
    return this.registrationForm.get('confirmEmail') as FormControl;
  }
  get password() {
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get phone() {
    return this.registrationForm.get('phone') as FormControl;
  }

  onSubmit() {
    console.log(this.registrationForm);

    this.userSubmitted = true;

    if(this.registrationForm.valid) {
      //this.user = Object.assign(this.user, this.registrationForm.value);
      this.userService.addUserToLocalStorage(this.userData());
      this.registrationForm.reset();

      this.userSubmitted = false;

      this.alertify.success('Congrats, you are successfully registered!');
    } else {
      this.alertify.error('Please provide the required fields');
    }
  }

  userData(): User {
    return this.user = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      phone: this.phone.value
    }
  }


}
