import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { find } from 'lodash';
import { forkJoin, Subject } from 'rxjs';
import { EntityService } from '../../core/services/entity.service';
import { Position } from '../../core/models/position.model';
import { Origin } from '../../core/models/origin.model';
import { Agency } from '../../core/models/agency.model';
import { Closed } from '../../core/enums/closed.enum';
import { Visit } from '../../core/models/visit.model';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-candidates-visit-tabs',
  templateUrl: './visit-tabs.component.html',
  styleUrls: ['./visit-tabs.component.scss']
})
export class VisitTabsComponent implements OnInit, OnDestroy {

  @Input() visits: FormArray;
  @Input() visitsData: Visit[];

  public positions: Position[];
  public agencies: Agency[];
  public origins: Origin[];
  public periods: string[] = ['1 Month', '2 Month', '3 Month', '4 Month'];
  public closed;
  public today: Date = new Date();

  private destroy$: Subject<boolean> = new Subject();

  constructor(private entityService: EntityService,
              private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.visits.valueChanges
      .pipe(
        debounceTime(0),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((data: Visit[]) => {
        data.forEach((visit: Visit, key: number) => {
          console.log(visit.closed);
          visit.closed ?
            this.getVisitsItem(key).disable({ emitEvent: false }) :
            this.getVisitsItem(key).enable({ emitEvent: false });
        });
      });

    if (this.visitsData.length) {
      this.visitsData.forEach((visit: any, i) => {
        this.addVisit();
        this.getVisitsItem(i).patchValue(visit);
      });
    } else {
      this.addVisit();
    }

    this.closed = Closed;

    forkJoin([
      this.entityService.getPositions(),
      this.entityService.getAgencies(),
      this.entityService.getOrigins()
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([positions, agencies, origins]) => {
        this.positions = positions;
        this.agencies = agencies;
        this.origins = origins;
      });
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public reopenVisit(i: number): void {
    this.getClosedControl(i).setValue(false);
  }

  public closeVisit(i: number, type: Closed): void {
    this.getClosedControl(i).setValue(type);
  }

  public addVisit(): void {
    if (this.hasActiveVisits()) {
      return;
    }
    this.visits.push(this.initVisits());
  }

  public removeVisit(i: number): void {
    this.visits.removeAt(i);
  }

  public hasActiveVisits(): boolean {
    return !!find(this.visits.getRawValue(), ['closed', false]);
  }

  private getVisitsItem(i: number): FormGroup {
    return <FormGroup>this.visits.get(i.toString());
  }

  private getClosedControl(i: number): AbstractControl {
    return <FormControl>this.getVisitsItem(i).get('closed');
  }

  private initVisits(): FormGroup {
    return this.fb.group({
      active: [true],
      closed: [false],
      general: this.fb.group({
        company: [''],
        date: [this.today, [Validators.required]],
        desiredSalary: [''],
        notes: [''],
        rating: [0],
        uploadedCvId: [''],
        _agency: [''],
        _origin: [''],
        _position: ['', [Validators.required]]
      }),
      skype: this.fb.group({
        planned: [false],
        dateTime: [''],
        time: [''],
        rating: [0],
        notes: [''],
      }),
      office: this.fb.group({
        planned: [false],
        dateTime: [],
        time: [],
        rating: [0],
        notes: [''],
      }),
      proposal: this.fb.group({
        date: [''],
        notes: [''],
        probationDuration: [''],
        probationSalary: [''],
        salary: [''],
        done: [false]
      }),
    });
  }
}