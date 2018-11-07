import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('userToken is ',localStorage.getItem('userToken'), ' param token',route.queryParams.userToken);
          
        if (localStorage.getItem('userToken') == route.queryParams.userToken) {
          return true;
        }
        
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
