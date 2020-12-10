import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';
import { UsersUploadPageComponent } from './pages/users-upload-page/users-upload-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: UsersListPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'upload', component: UsersUploadPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
