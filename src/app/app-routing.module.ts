import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminGuard } from './admin/guard/admin.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AboutComponent } from './core/components/about/about.component';
import { HomeComponent } from './core/components/home/home.component';
import { MainComponent } from './core/components/main/main.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { PrivacyPolicyComponent } from './core/components/privacy-policy/privacy-policy.component';
import { UnderConstructionComponent } from './core/components/under-construction/under-construction.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: MainComponent },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuard],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'items',
        loadChildren: () =>
          import('./item/item.module').then((m) => m.ItemModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'board',
        loadChildren: () =>
          import('./board/board.module').then((m) => m.BoardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'classroom',
        loadChildren: () =>
          import('./classroom/classroom.module').then((m) => m.ClassroomModule),
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'under-construction', component: UnderConstructionComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      preloadingStrategy: PreloadAllModules,
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
