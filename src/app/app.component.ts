import { Component } from '@angular/core';
import { GlobalService } from './services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'timer';

  showMenu: boolean = false;

  opcao: string = '';

  constructor(private globalService: GlobalService, private router: Router) {}

  ngOnInit(): void {
    this.globalService.shomMenuEmitter.subscribe((show) => {
      this.showMenu = show;
    });
    this.onLogin();
  }

  ngOnDestroy(): void {
    this.globalService.shomMenuEmitter.unsubscribe();
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  getUsuario(): string {
    return this.globalService.getNomeusuarioLogado();
  }

  okProjetos(): boolean {
    return this.globalService.okProjetos();
  }

  okPlanejamento(): boolean {
    return this.globalService.okPlanejamento();
  }

  okExecucao(): boolean {
    return this.globalService.okExecucao();
  }

  okGerencial(): boolean {
    return this.globalService.okGerencial();
  }

  getClassMenu(): string {
    if (this.opcao == 'Cadastros') return 'menu-ativo';
    return 'menu-standyby';
  }

  setOpcao(value: string): void {
    this.opcao = value;
  }

  getLocalId(): number {
    return this.globalService.getLocal().id;
  }

  getInventarioId(): number {
    return this.globalService.getInventario().codigo;
  }
}
