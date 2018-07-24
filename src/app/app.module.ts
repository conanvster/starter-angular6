import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { MenuComponent } from './menu/menu.component';
import { AuthService } from './core/services/auth.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TokenService } from './core/services/token.service';
import { HttpHeadersInterceptor } from './core/interceptors/http-headers.interceptor';
import { UserService } from './core/services/user.service';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { CandidatesService } from './core/services/candidates.service';
import { EntityService } from './core/services/entity.service';

export function initializer(userService: UserService) {
  return () => {
    return userService.getUserForLoad();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    MenuComponent,
    ProfileSettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    TokenService,
    UserService,
    AuthGuardService,
    CandidatesService,
    EntityService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initializer, deps: [UserService], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
