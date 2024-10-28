import { Component, Input, OnInit } from '@angular/core';
import { FotosAtivo } from 'src/app/shared/classes/fotos-ativo';

@Component({
  selector: 'app-browser-foto',
  templateUrl: './browser-foto.component.html',
  styleUrls: ['./browser-foto.component.css']
})
export class BrowserFotoComponent implements OnInit {
  @Input('FOTOS') fotos:FotosAtivo[] = []

  constructor() { }

  ngOnInit(): void {
  }

  itsOK(idx:number,foto:FotosAtivo){
    return idx <= foto.fotos.length-1 ? true : false;
  }
}
