import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../core/services/candidates.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Visit } from '../../core/models/visit.model';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form: FormGroup;
  public today: Date = new Date();
  public visitsData: Visit[];

  private isEdit = false;

  constructor(private candidatesService: CandidatesService,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.initForm();
    this.route.data
      .subscribe((data: { candidate: any }) => {
        if (data.candidate) {
          this.form.patchValue(data.candidate);
          this.visitsData = data.candidate.visits;
          this.isEdit = true;
        }
      });
  }

  public submitForm(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    if (this.isEdit) {
      this.candidatesService.edit(this.form.getRawValue())
        .subscribe();
    } else {
      this.candidatesService.create(this.form.getRawValue())
        .subscribe();
    }
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
      visits: this.fb.array([]),
      _id: ['']
    });
  }
}
