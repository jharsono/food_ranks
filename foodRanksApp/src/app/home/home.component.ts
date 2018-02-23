import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  countries: any;
  constructor(private _httpService: HttpService,
            private _route: ActivatedRoute,
            private _router: Router
  ){ }
  ngOnInit() {
    this.countries = {}; //set the authors to an empty object
    this.getCountriesFromService();
    this._route.params.subscribe((params: Params) => console.log(params['id']));

  }
  getCountriesFromService(){ // define the function to get an observable and subscribe
    let observable = this._httpService.getAllCountries(); //getAllAuthors is invoked from http.service
    observable.subscribe(data => {
        console.log("Got our data!", data);
        this.countries = data; //put data into products objects
      }); // subscribe
    }

    delete(id){
      let observable = this._httpService.delete(id);
      observable.subscribe( data => {
        this.getCountriesFromService();
      });
    }
}
