import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './candidates.component';
import { TableComponent } from './table/table.component';
import { CandidateEditorComponent } from './candidate-editor/candidate-editor.component';
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
        component: CandidateEditorComponent,
      },
      {
        path: ':id',
        component: CandidateEditorComponent,
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
