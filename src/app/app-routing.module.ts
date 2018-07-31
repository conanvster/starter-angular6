import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { CandidatesModule } from './candidates/candidates.module';
import {SkillsComponent} from './skills/skills.component';

const routes: Routes = [
  {
    path: 'candidates',
    loadChildren: () => CandidatesModule,
    canActivate: [AuthGuardService],
  },
  {
    path: "skills",
    component: SkillsComponent
  },
  {
    path: 'profile-settings',
    component: ProfileSettingsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: '**',
    redirectTo: '/candidates',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
