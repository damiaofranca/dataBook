import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/authService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isOpenMenu: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  toggleMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  logOut() {
    this.authService.signOut().finally();
  }

  goToHome() {
    this.isOpenMenu = false;
    this.router.navigate(['/home']);
  }
  
  goToProfile() {
    this.isOpenMenu = false;
    this.router.navigate(['/profile']);
  }


  goToFavorites() {
    this.isOpenMenu = false;
    this.router.navigate(['/favorites']);
  }
}
