import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import {AuthComponent} from './auth.component';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class AuthModule {
}