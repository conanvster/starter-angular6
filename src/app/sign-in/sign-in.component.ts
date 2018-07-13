import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
  }

  public ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmitForm(): void {
    if (this.form.invalid) {
      return;
    }
    this.authService.singIn(this.form.value)
      .subscribe();
  }
}
