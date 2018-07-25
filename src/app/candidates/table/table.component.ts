import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CandidatesService } from '../../core/services/candidates.service';
import { Candidate } from '../../core/models/candidate.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { pickBy, forIn, find } from 'lodash';
import { EntityService } from '../../core/services/entity.service';
import { Position } from '../../core/models/position.model';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource = new MatTableDataSource<Candidate>();
  public displayedColumns: string[] = ['firstName', 'lastName', 'lastVisitDate', 'lastPosition', 'actions'];
  public columnsWithFilter: string[] = ['filterFirstName', 'filterLastName', 'empty', 'filterLastPosition', 'empty'];
  public formFilter: FormGroup;
  public positions: Position[];

  private recordFilters: { [key: string]: string };
  private destroy$: Subject<boolean> = new Subject();

  constructor(private candidatesService: CandidatesService,
              private entityService: EntityService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.setCandidatesToDataSource();

    this.entityService.getPositions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((positions: Position[]) => {
        this.positions = positions;
      });

    this.formFilter = this.fb.group({
      firstName: [''],
      lastName: [''],
      _lastVisitPosition: ['']
    });

    this.dataSource.filterPredicate = (data: Candidate) => {
      let show = true;
      forIn(this.recordFilters, (value, key) => {
        if (data[key].indexOf(value) === -1) {
          show = false;
        }
      });
      return show;
    };

    this.formFilter.valueChanges
      .pipe(
        debounceTime(0),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((fields: { [key: string]: string }) => {
        this.recordFilters = pickBy(fields, (value) => !!value);
        this.dataSource.filter = 'some changes';
      });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public delete(id: string): void {
    this.candidatesService.delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.setCandidatesToDataSource();
      });
  }

  public goToEdit(id: string): void {
    this.router.navigate([`candidates/${id}`]);
  }

// TODO: add date reducer for this route
  public getPositionById(id: string): string {
    return this.positions ? find(this.positions, { '_id': id }).name : '';
  }

  private setCandidatesToDataSource(): void {
    this.candidatesService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((candidates: Candidate[]) => {
        this.dataSource.data = candidates;
      });
  }
}
