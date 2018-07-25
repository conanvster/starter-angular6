import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CandidateEditorComponent } from './candidate-editor/candidate-editor.component';
import { CandidatesComponent } from './candidates.component';
import { CandidatesRoutingModule } from './candidates-routing.module';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from './table/table.component';
import { VisitTabsComponent } from './visit-tabs/visit-tabs.component';
import { CandidatesService } from '../core/services/candidates.service';
import { TabLabelComponent } from './visit-tabs/tab-label/tab-label.component';
import { GeneralComponent } from './visit-tabs/general/general.component';
import { UniversalBlockComponent } from './visit-tabs/universal-block/universal-block.component';
import { ProposalComponent } from './visit-tabs/proposal/proposal.component';

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
    VisitTabsComponent,
    TabLabelComponent,
    GeneralComponent,
    UniversalBlockComponent,
    ProposalComponent
  ],
  providers: [
    CandidatesService
  ]
})
export class CandidatesModule {
}
