import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EntityService } from '../core/services/entity.service';
import { CandidatesService } from '../core/services/candidates.service';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange, MatTabGroup } from '@angular/material';
import { Candidate } from '../core/models/candidate.model';
import { Position } from '../core/models/position.model';
import { takeUntil } from 'rxjs/operators';
import { Agency } from '../core/models/agency.model';
import { forkJoin } from 'rxjs';
import { Origin } from '../core/models/origin.model';
import { find } from 'lodash';
import { Closed } from '../core/models/closed.enum';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  @Input() candidate: Candidate;

  public form: FormGroup;
  public today: Date = new Date();
  public positions: Position[];
  public agencies: Agency[];
  public origins: Origin[];
  public periods: string[] = ['1 Month', '2 Month', '3 Month', '4 Month'];
  public closed;
  public visits: FormArray;

  constructor(private candidatesService: CandidatesService,
              private entityService: EntityService,
              private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.closed = Closed;
    this.initForm();

    forkJoin([
      this.entityService.getPositions(),
      this.entityService.getAgencies(),
      this.entityService.getOrigins()
    ]).subscribe(([positions, agencies, origins]) => {
      this.positions = positions;
      this.agencies = agencies;
      this.origins = origins;
    });
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

  public getVisitsItem(i: number): FormGroup {
    return <FormGroup>this.visits.get(i.toString());
  }

  public getClosedControl(i: number): AbstractControl {
    return <FormControl>this.getVisitsItem(i).get('closed');
  }

  public submitForm(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    this.candidatesService.create(this.form.getRawValue())
      .subscribe();
  }

  public hasActiveVisits(): boolean {
    return !!find(this.visits.getRawValue(), ['closed', false]);
  }

  public getVisitStatus(i: number): any {
    return this.getVisitsItem(i).get('closed');
    // return Closed[value];
  }

  public reopenVisit(i: number): void {
    this.getClosedControl(i).setValue(false);
  }

  public closeVisit(i: number, type: Closed): void {
    this.getClosedControl(i).setValue(type);
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthYear: [''],
      email: [''],
      skypeId: [''],
      phone1: [''],
      phone2: [''],
      linkedinUrl: [''],
      preferences: [''],
      notes: [''],
      visits: this.fb.array([this.initVisits()])
    });

    this.visits = <FormArray>this.form.get('visits');
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
