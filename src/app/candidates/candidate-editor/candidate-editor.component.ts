import { Component, OnDestroy, OnInit } from '@angular/core';
import { CandidatesService } from '../../core/services/candidates.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Visit } from '../../core/models/visit.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-candidate-candidate-editor',
  templateUrl: './candidate-editor.component.html',
  styleUrls: ['./candidate-editor.component.scss']
})
export class CandidateEditorComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public today: Date = new Date();
  public visitsData: Visit[];

  private isEdit = false;
  private destroy$: Subject<boolean> = new Subject();

  constructor(private candidatesService: CandidatesService,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.initForm();
    this.route.data
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: { candidate: any }) => {
        if (data.candidate) {
          this.form.addControl('_id', new FormControl(''));
          this.form.patchValue(data.candidate);
          this.visitsData = data.candidate.visits;
          this.isEdit = true;
        }
      });
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public submitForm(): void {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }

    if (this.isEdit) {
      this.candidatesService.edit(this.form.getRawValue())
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    } else {
      this.candidatesService.create(this.form.getRawValue())
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthYear: ['', [Validators.max(this.today.getFullYear())]],
      email: [''],
      skypeId: [''],
      phone1: [''],
      phone2: [''],
      linkedinUrl: [''],
      preferences: [''],
      notes: [''],
      visits: this.fb.array([]),
    });
  }
}
