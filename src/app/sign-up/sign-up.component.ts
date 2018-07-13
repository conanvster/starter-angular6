import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public form: FormGroup;

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

  public onSubmitForm(): void {
    if (this.form.invalid) {
      return;
    }
    this.authService.signUp(this.form.value)
      .subscribe();
  }
}
