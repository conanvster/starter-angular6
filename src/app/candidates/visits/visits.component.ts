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
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit, OnDestroy {

  @Input() form: FormArray;
  @Input() visits: Visit[];

  public positions: Position[];
  public agencies: Agency[];
  public origins: Origin[];
  public today: Date = new Date();
  public closed;
  public selectedIndex = 1;

  private destroy$: Subject<boolean> = new Subject();

  constructor(private entityService: EntityService,
              private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.form.valueChanges
      .pipe(
        debounceTime(0),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((data: Visit[]) => {
        data.forEach((visit: Visit) => {
          visit.closed ?
            this.getVisitsItem(visit.tabId).disable({ emitEvent: false }) :
            this.getVisitsItem(visit.tabId).enable({ emitEvent: false });
        });
      });

    this.closed = Closed;

    if (this.visits) {
      this.visits.forEach((visit: any, i) => {
        this.addVisit();
        this.getVisitsItem(i).patchValue(visit);
      });
      this.selectedIndex = this.visits.length;
    } else {
      this.addVisit();
      this.selectedIndex = 1;
    }

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

  public getClosedAlertText(type: Closed): string {
    return type === this.closed.HIRED ?
      'This visit has been closed. Candidate was hired. Reopen to edit.' :
      'This visit has been closed. Candidate rejected offer or didn\'t pass interviews. Reopen to edit.';
  }

  public addVisit(): void {
    if (this.hasActiveVisits()) {
      return;
    }
    this.form.push(this.initVisit());
    this.selectedIndex = this.form.controls.length;
    console.log(this.form.controls.length);
  }

  public removeVisit(i: number): void {
    this.form.removeAt(i);
  }

  public hasActiveVisits(): boolean {
    return !!find(this.form.getRawValue(), ['closed', false]);
  }

  private getVisitsItem(i: number): FormGroup {
    return <FormGroup>this.form.get(i.toString());
  }

  private getClosedControl(i: number): AbstractControl {
    return <FormControl>this.getVisitsItem(i).get('closed');
  }

  private initVisit(): FormGroup {
    return this.fb.group({
      tabId: [Number(this.form.controls.length)],
      active: [true],
      closed: [false],
      general: this.fb.group({
        company: [''],
        date: [this.today, [Validators.required, Validators.maxLength(4)]],
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
