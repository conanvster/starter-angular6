import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  private destroy$: Subject<boolean> = new Subject();

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
  }

  public ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onSubmitForm(): void {
    if (this.form.invalid) {
      return;
    }
    this.authService.signUp(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
