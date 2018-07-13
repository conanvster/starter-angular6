import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  private destroy$: Subject<boolean> = new Subject();

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
  }

  public ngOnInit() {
    this.form = this.fb.group({
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
    this.authService.singIn(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
