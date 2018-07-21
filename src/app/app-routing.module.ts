import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';

const routes: Routes = [
  {
    path: 'candidates',
    component: CandidatesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'add-candidate',
    component: CandidateFormComponent,
    canActivate: [AuthGuardService],
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
    redirectTo: 'candidates'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
