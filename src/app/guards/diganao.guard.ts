import { GlobalService } from './../services/global.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiganaoGuard implements CanActivate, CanActivateChild {
  constructor(private globalService: GlobalService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.globalService.getLogado()) return false;
    if (
      (route.routeConfig?.path == 'produtos' ||
        route.routeConfig?.path == 'usuarios_inventarios') &&
      this.globalService.getInventario().codigo == 0
    ) {
      alert('Favor Definir Inventário Padrão!');
      return false;
    }
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('Estou na Child');
    return false;
  }
}
