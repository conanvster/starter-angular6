import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './candidates.component';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { CandidateResolverService } from './candidate-resolver.service';

const candidateRoutes: Routes = [
  {
    path: '',
    component: CandidatesComponent,
    children: [
      {
        path: '',
        component: TableComponent,
      },
      {
        path: 'add',
        component: FormComponent,
      },
      {
        path: ':id',
        component: FormComponent,
        resolve: {
          candidate: CandidateResolverService
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(candidateRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CandidateResolverService
  ]
})
export class CandidatesRoutingModule {
}
