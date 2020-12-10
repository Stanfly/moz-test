import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { fakeBackendInterceptor } from './interceptors/fake-backend.interceptor';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { UsersUploadPageComponent } from './pages/users-upload-page/users-upload-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { UiComponentsModule } from './components/ui-components/ui-components.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './pipes/pipes.module';
import { ModalsModule } from './components/modals/modals.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersListPageComponent,
    AboutPageComponent,
    UsersUploadPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UiComponentsModule,
    ModalsModule,
    PipesModule
  ],
  providers: [fakeBackendInterceptor],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
