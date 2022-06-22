
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthsService } from '../auth.service';
@Injectable()
export class UserGuard implements CanActivate {
  constructor(private auth: AuthsService,
    private myRoute: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.currentUser() || !this.auth.isAuthorized()) {
      this.myRoute.navigate(["sessions/signin"]);
    }
    return true;
  }
}
@Injectable()
export class ActiveUser implements CanActivate {
  user: any;
  constructor(public router: Router, private auth: AuthsService,) {
    this.user = this.auth.currentUser();
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.currentUser()) {
      return true
    } else if (this.user.role == "operationadmin") { this.router.navigate(['beta-program/enrolled']); }
    else { this.router.navigate(["dashboard/analytics"]); }

  }
}