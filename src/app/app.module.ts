import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import { GlobalService } from './services/global.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrPaginatorIntl } from './shared/classes/br-PaginatorIntl';
import { DiganaoGuard } from './guards/diganao.guard';
import { NgxMaskModule } from 'ngx-mask';
import { SimNaoPipe } from './shared/pipes/sim-nao.pipe';
import localePt from '@angular/common/locales/pt';
import { FirstNamePipe } from './shared/pipes/first-name.pipe';
import { SituacaoPipe } from './shared/pipes/situacao.pipe';
import { OrigemPipe } from './shared/pipes/origem.pipe';
import { MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { LocalStorageService } from './services/localStorage.service';
import { CondicaoPipePipe } from './shared/pipes/condicao-pipe.pipe';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false,
    }),
  ],
  providers: [
    HttpClient,
    DatePipe,
    DecimalPipe,
    SimNaoPipe,
    FirstNamePipe,
    SituacaoPipe,
    OrigemPipe,
    CondicaoPipePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt' },
    DiganaoGuard,
    GlobalService,
    LocalStorageService,
    { provide: MatPaginatorIntl, useClass: BrPaginatorIntl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
