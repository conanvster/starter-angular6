import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EntityService } from '../core/services/entity.service';
import { CandidatesService } from '../core/services/candidates.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange, MatTabGroup } from '@angular/material';
import { Candidate } from '../core/models/candidate.model';
import { Position } from '../core/models/position.model';
import { takeUntil } from 'rxjs/operators';
import { Agency } from '../core/models/agency.model';
import { forkJoin } from 'rxjs';
import { Origin } from '../core/models/origin.model';
import { find } from 'lodash';

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

  constructor(private candidatesService: CandidatesService,
              private entityService: EntityService,
              private fb: FormBuilder) {
  }

  public ngOnInit() {
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
    if (this.checkActiveVisits()) {
      return;
    }
    const control = <FormArray>this.form.get(['visits']);
    control.push(this.initVisits());
  }

  public removeVisit(i: number): void {
    const control = <FormArray>this.form.get(['visits']);
    control.removeAt(i);
  }

  public submitForm(): void {
    console.log(this.form.getRawValue());
    console.log(this.form.valid);
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }
  }

  public checkActiveVisits(): boolean {
    return !!find(this.form.get('visits').value, 'active');
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
  }

  private initVisits(): FormGroup {
    return this.fb.group({
      active: [true],
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
