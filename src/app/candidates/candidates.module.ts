import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { CandidatesComponent } from './candidates.component';
import { CandidatesRoutingModule } from './candidates-routing.module';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from './table/table.component';
import { VisitTabsComponent } from './visit-tabs/visit-tabs.component';
import { CandidatesService } from '../core/services/candidates.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CandidatesRoutingModule,
    MaterialModule
  ],
  declarations: [
    FormComponent,
    CandidatesComponent,
    TableComponent,
    VisitTabsComponent
  ],
  providers: [
    CandidatesService
  ]
})
export class CandidatesModule {
}
