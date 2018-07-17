import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private destroy$: Subject<boolean> = new Subject();

  constructor(private fb: FormBuilder,
              private userService: UserService) {
  }

  public ngOnInit() {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required]
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
    this.userService.changePassword(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
