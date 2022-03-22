import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/authService';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  formSignUp = new FormGroup({
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
    if (this.formSignUp.valid) {
      this.authService.signUp(
        this.formSignUp.value.email,
        this.formSignUp.value.password
      );
    } else {
      this.toastr.error('Por favor, preencha todos os campos!', 'Error', {
        positionClass: 'toast-bottom-left',
      });
    }
  }

  signWithGoogle() {
    this.authService.GoogleAuth();
  }

  showPassword() {
    this.showPassWord = !this.showPassWord;
  }
}
