import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import {ImageUploadComponent} from './pages/uploadimage/image-upload.component'
import {AadhaarUploadComponent} from './pages/aadharupload/aadhaar-upload.component'

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
{ path: 'home', component: ImageUploadComponent },
{path:'homev2',component:AadhaarUploadComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
