import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { HomeComponent } from './home/home.component';
import { EditDishComponent } from './edit-dish/edit-dish.component';
import { AddDishComponent } from './add-dish/add-dish.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';


const routes: Routes = [
  { path: 'country/:id',component: CountryComponent },
  { path: 'home',component: HomeComponent },
  { path: 'editDish/:id',component: EditDishComponent },
  { path: 'addDish/:id',component: AddDishComponent },
  { path: 'addCountry',component: AddCountryComponent },
  { path: 'editCountry/:id',component: EditCountryComponent },

  { path: '', pathMatch: 'full', redirectTo: '/home' }, //set default to home

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
