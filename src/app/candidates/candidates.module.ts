import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CandidateEditorComponent } from './candidate-editor/candidate-editor.component';
import { CandidatesComponent } from './candidates.component';
import { CandidatesRoutingModule } from './candidates-routing.module';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from './table/table.component';
import { VisitsComponent } from './visits/visits.component';
import { CandidatesService } from '../core/services/candidates.service';
import { LabelComponent } from './visits/label/label.component';
import { GeneralComponent } from './visits/general/general.component';
import { UniversalBlockComponent } from './visits/universal-block/universal-block.component';
import { ProposalComponent } from './visits/proposal/proposal.component';
import { RatingComponent } from './visits/rating/rating.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CandidatesRoutingModule,
    MaterialModule
  ],
  declarations: [
    CandidateEditorComponent,
    CandidatesComponent,
    TableComponent,
    VisitsComponent,
    LabelComponent,
    GeneralComponent,
    UniversalBlockComponent,
    ProposalComponent,
    RatingComponent
  ],
  providers: [
    CandidatesService
  ]
})
export class CandidatesModule {
}
