import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/authService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  formSignIn = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  showPassWord: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.formSignIn.valid) {
      this.authService.signIn(
        this.formSignIn.value.email,
        this.formSignIn.value.password
      );
    } else {
      this.toastr.error('Por favor, preencha todos os campos!', 'Error', {
        positionClass: 'toast-bottom-left',
      });
    }
  }

  signWithGoogle() {
    this.authService.GoogleAuth()
  }

  showPassword() {
    this.showPassWord = !this.showPassWord;
  }
}
