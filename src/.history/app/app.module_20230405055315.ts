import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MapToIterable } from './dashboard/main/PropertiesPipe';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RightSidebarComponent } from './layout/right-sidebar/right-sidebar.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { fakeBackendProvider } from './core/interceptor/fake-backend';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AnglaisComponent } from './anglais/anglais.component';
import { ElevesComponent } from './eleves/eleves.component';

/**/
import { FormsModule,  } from '@angular/forms';
//import { ToastrModule } from 'ngx-toastr';
import { AdministrateursComponent } from './administrateurs/administrateurs.component';
import { ParentsComponent } from './parents/parents.component';
import { EnseignantsComponent } from './enseignants/enseignants.component';
import { EleveFormComponent } from './eleve-form/eleve-form.component';
import { HistoriqueAbonnementsComponent } from './historique-abonnements/historique-abonnements.component';
import { EnseignantFormComponent } from './enseignant-form/enseignant-form.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { AdminFormComponent } from './admin-form/admin-form.component';

/**/


import { FichesComponent } from './gestion/fiches/fiches.component';
import { FichesMComponent } from './fiches-m/fiches-m.component';
import { ToastrModule } from 'ngx-toastr';
import { ChapitresComponent } from './chapitres/chapitres.component';
import { CoursComponent } from './cours/cours.component';
import { GeneraleComponent } from './generale/generale.component';
import { PipePipe } from './pipe.pipe';
import { CategorieComponent } from './categorie/categorie.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: false,
};

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    FooterComponent,
    AnglaisComponent,
    PipePipe,

    ElevesComponent,
    AdministrateursComponent,
    ParentsComponent,
    EnseignantsComponent,
    EleveFormComponent,
    HistoriqueAbonnementsComponent,
    EnseignantFormComponent,
    ParentFormComponent,
    AdminFormComponent,
  
    FichesComponent,
    FichesMComponent,
    ChapitresComponent,
    ProduitsComponent,
    CategorieComponent,
    GeneraleComponent,
    PipePipe,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    ArchwizardModule,NgSelectModule,
    //NgxDatatableModule,
    /**/
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    /**/

    NgxDatatableModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    // core & shared
    CoreModule,
    SharedModule,
    NgbModule
  ],
  providers: [NgbActiveModal,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
