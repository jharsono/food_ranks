import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { HomeComponent } from './home/home.component';
import { EditDishComponent } from './edit-dish/edit-dish.component';
import { AddDishComponent } from './add-dish/add-dish.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';


@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    HomeComponent,
    EditDishComponent,
    AddDishComponent,
    AddCountryComponent,
    EditCountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
