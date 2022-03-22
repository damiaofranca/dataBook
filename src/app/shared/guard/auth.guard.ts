import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/authService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): Observable<UrlTree | boolean> | Promise<boolean> | boolean {
    return new Observable((observer) => {
      this.authService.isLogged$().subscribe((isLogged) => {
        if (!isLogged) {
          observer.next(this.router.createUrlTree(['/auth']));
        } else {
          observer.next(true);
        }
        observer.complete();
      });
    });
  }
}
