import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestureConfig, MatButtonModule, MatFormFieldModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/inmemory-db/inmemory-db.service';
import { rootRouterConfig } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng5SliderModule } from 'ng5-slider';
import { DataPopupComponent } from './views/tables/data-popup/data-popup.component';
import { RolespopupComponent } from './rolespopup/rolespopup.component';
import { ActiveUser } from './shared/services/auth/auth.guard';
import { AuthsService } from './shared/services/auth.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { Globals } from './shared/helpers/globalfunctions';
import { AgmCoreModule } from '@agm/core';
import { ProgramLocationComponent } from './views/forms/program-form/program-location/program-location.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    NgxDatatableModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    Ng5SliderModule,
    HttpClientModule,
    PerfectScrollbarModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true }),
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_5P0pxn1q9hvvTeCr3YCsDhLJoHwxs2c',
      libraries: ['places']
    }),
  ],
  declarations: [AppComponent, ProgramLocationComponent, DataPopupComponent, RolespopupComponent],
  entryComponents: [DataPopupComponent, ProgramLocationComponent, RolespopupComponent],
  providers: [
    ActiveUser,
    AuthsService,
    Globals,
    LocalStorageService,
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
