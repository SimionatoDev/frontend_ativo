import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { PadraoModel } from '../models/padrao-model';
import { EmpresaModel } from '../models/empresa-model';
import { UsuarioModel } from '../models/usuario-model';
import { InventarioModel } from '../models/inventario-model';
import { LocalModel } from '../models/local-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private globalService: GlobalService, private router: Router) {}

  ngOnInit(): void {
    if (!this.globalService.getLogado()) {
      this.router.navigate(['/login']);
    }
  }

  getPadrao(): PadraoModel {
    return this.globalService.getPadrao();
  }
  getEmpresa(): EmpresaModel {
    return this.globalService.getEmpresa();
  }
  getUsuario(): UsuarioModel {
    return this.globalService.getUsuario();
  }
  getLocal(): LocalModel {
    return this.globalService.getLocal();
  }
  getInventario(): InventarioModel {
    return this.globalService.getInventario();
  }

  existeInventario(): Boolean {
    return this.globalService.getInventario().codigo > 0;
  }
}
