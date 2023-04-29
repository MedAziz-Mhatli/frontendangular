import { Injectable } from '@angular/core';
// @ts-ignore
import {Observable} from "rxjs/dist/types";
import {AuthService} from "../core/service/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private authService: AuthService, private router: Router) { }
  hasPermission(component): Observable<boolean> {
    if (component.data.role === "NOT_CONNECTED"){
      if(!this.authService.currentUserValue){
        return true;
      }
      else{
        const role = this.authService.currentUserValue.roles[0];
        this.redirectUser(role);
        return false;
      }
    }
    else{
      const role = this.authService.currentUserValue.roles[0];
      if (component.data.role === role){
        return true;
      }
      this.redirectUser(role);
      return false;
    }
  }
  redirectUser(userRole) {
    if (userRole === "ROLE_USER") {
      this.router.navigate(['/user']);
    } else if (userRole === "ROLE_VENDEUR") {
      this.router.navigate(['/advance-table']);
    } else if (userRole === "ROLE_ADMIN") {
      this.router.navigate(['/dashboard/main']);
    }
  }
}
