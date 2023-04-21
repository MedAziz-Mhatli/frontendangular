import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
/*Nouveau*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AnglaisComponent } from './anglais/anglais.component';
import { ElevesComponent } from './eleves/eleves.component';
import { AdministrateursComponent } from './administrateurs/administrateurs.component';
import { ParentsComponent } from './parents/parents.component';
import { EnseignantsComponent } from './enseignants/enseignants.component';
import { EleveFormComponent } from './eleve-form/eleve-form.component';
import { HistoriqueAbonnementsComponent } from './historique-abonnements/historique-abonnements.component';
import { EnseignantFormComponent } from './enseignant-form/enseignant-form.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { ProfileComponent } from './extra-pages/profile/profile.component';
import { OffresComponent } from './extra-pages/offres/offres.component';
import { EditProfileComponent } from './extra-pages/edit-profile/edit-profile.component';
import { AdminFormComponent } from './admin-form/admin-form.component';





import { FichesMComponent } from './fiches-m/fiches-m.component';
import { ChapitresComponent } from './chapitres/chapitres.component';
import { MainComponent } from './dashboard/main/main.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ProduitsComponent } from './produits/produits.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'advance-table/:chapitreId',
        loadChildren: () =>
          import('./advance-table/advance-table.module').then(
            (m) => m.AdvanceTableModule
          ),
      },

      //Component English
      {
        path:'Matieres/:matiereId',
        component:AnglaisComponent,
      },
      //Component Eleves
      {
        path:'élèves',
        component:ElevesComponent,
      },
      //Component Administrateur
      {
        path:'administrateurs',
        component:AdministrateursComponent,
      },
      //Component Parents
      {
        path:'parents',
        component:ParentsComponent,
      },
      //Component Enseignants
      {
        path:'enseignants',
        component:EnseignantsComponent,
      },
      //component editer profile
      {
        path:'edit',
        component:EditProfileComponent,
      },
      
      //comonent Eleve form
      {
        path:'AjoutElève',
        component:EleveFormComponent,
      },

      /*{
        path:'ModifElève',
        component:EleveFormComponent,
      },*/


      //Component Historique Abonnement
      {
        path:'Historique des abonnements',
        component:HistoriqueAbonnementsComponent,
      },
      //Component Enseignant Form
      {
        path:'AjoutEnseignant',
        component:EnseignantFormComponent,
      },
      //Component Parent Form
      {
        path:'AjoutParent',
        component: ParentFormComponent,
      },
      //Componnet Offres
      {
        path:'offres',
        component: OffresComponent,
      },
      
      //Component Admin Form
      {
        path:'AjoutAdmin',
        component:AdminFormComponent,
      },
      


      
      
      {
        path:'fichesMatieres',
        component:FichesMComponent,
      },
      {
        path:'GestionCategories',
        component:CategorieComponent,
      },
      {
        path:'produits',
        component:ProduitsComponent,
      },
      {
        path:'listeMatieres',
        component:MainComponent,
      },
      {
        path:'chapitres',
        component:ChapitresComponent,
      },
      {
        path: 'extra-pages',
        loadChildren: () =>
          import('./extra-pages/extra-pages.module').then(
            (m) => m.ExtraPagesModule
          ),
      },
    
      {
        path: 'multilevel',
        loadChildren: () =>
          import('./multilevel/multilevel.module').then(
            (m) => m.MultilevelModule
          ),
      },
    ],
  },

  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
