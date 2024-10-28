import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FotoModel } from 'src/app/models/foto-model';
import { ParametroFoto01 } from 'src/app/parametros/parametro-foto01';
import { FotoService } from 'src/app/services/foto.service';
import { GlobalService } from 'src/app/services/global.service';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { messageError } from 'src/app/shared/classes/util';

@Component({
  selector: 'app-show-fotos',
  templateUrl: './show-fotos.component.html',
  styleUrls: ['./show-fotos.component.css'],
})
export class ShowFotosComponent implements OnInit {
  /*  images = [
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
      title: 'Hummingbirds are amazing creatures',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
      title: 'Example with title.',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
      title: 'Hummingbirds are amazing creatures',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
      title: 'Example two with title.',
    },
  ];
 */
  images: any[] = [];
  inscricaoFoto!: Subscription;
  inscricaoRota!: Subscription;

  fotos: FotoModel[] = [];

  id_empresa: number = 0;
  id_local: number = 0;
  id_inventario: number = 0;
  id_imobilizado: number = 0;

  constructor(
    private fotoService: FotoService,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private appSnackBar: AppSnackbar
  ) {
    this.inscricaoRota = route.params.subscribe((params: any) => {
      this.id_empresa = params.id_empresa;
      this.id_local = params.id_local;
      this.id_inventario = params.id_inventario;
      this.id_imobilizado = params.id_imobilizado;
    });
    this.getFotos();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.inscricaoFoto?.unsubscribe();
    this.inscricaoRota?.unsubscribe();
  }

  onRetorno() {}

  getFotos() {
    let par = new ParametroFoto01();

    par.id_empresa = this.id_empresa;

    par.id_local = this.id_local;

    par.id_inventario = this.id_inventario;

    par.id_imobilizado = this.id_imobilizado;

    par.contador = 'N';

    this.globalService.setSpin(true);

    this.inscricaoFoto = this.fotoService.getFotosParametro_01(par).subscribe(
      (data: FotoModel[]) => {
        this.globalService.setSpin(false);
        this.fotos = data;
        this.loadImages();
      },
      (error: any) => {
        this.globalService.setSpin(false);
        this.fotos = [];
        this.appSnackBar.openFailureSnackBar(
          `Pesquisa Nas Fotos  ${messageError(error)}`,
          'OK'
        );
      }
    );
  }

  loadImages() {
    this.images = [];
    this.fotos.forEach((foto) => {
      let image = {
        image: `https://drive.google.com/uc?export=view&id=${foto.id_file}`,
        thumbImage: `https://drive.google.com/thumbnail?id=${foto.id_file}&sz=w200`,
        title: foto.imo_descricao,
      };
      this.images.push(image);
    });
  }
}
