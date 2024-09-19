import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlumbusComponent } from './pages/plumbus/plumbus.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plumbus', component: PlumbusComponent },
  { path: '**', redirectTo: '', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

