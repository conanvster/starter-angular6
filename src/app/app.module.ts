import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
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
import { ErrorsHandlerService } from './core/services/errors-handler.service';
import { SkillsComponent } from './skills/skills.component';
import { SkillsService } from './core/services/skills.service';

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
    ProfileSettingsComponent,
    SkillsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [
    AuthService,
    TokenService,
    UserService,
    AuthGuardService,
    CandidatesService,
    EntityService,
    SkillsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [UserService],
      multi: true,
    },
    { provide: ErrorHandler, useClass: ErrorsHandlerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
