import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { LineChartComponent } from './Charts/line-chart/line-chart.component';
import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [
  { path: '', component: AddUserComponent },
  { path: 'home', component: AddUserComponent },
  { path: 'view', component: ViewUsersComponent },
  {path : 'line-chart', component: LineChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
