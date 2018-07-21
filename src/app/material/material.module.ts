import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatButtonToggleModule, MatDatepickerModule, MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule, MatSortModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatDividerModule
];

@NgModule({
  exports: modules,
})
export class MaterialModule {
}
