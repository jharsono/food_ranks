import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css']
})
export class EditCountryComponent implements OnInit {
  country: any;
  params:any;
    constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router
        ){ }

  ngOnInit() {
    this.country = {name:"", imageUrl:""}
    this._route.params.subscribe((params: Params) => this.params= params);
    this.getOneCountry(this.params.id);

  }
  getOneCountry(id) {
    let observable = this._httpService.getOneCountry(id); //getAuthor is invoked from http.service
    observable.subscribe(data => {
        console.log("Got our data!", data);
        this.country = data; //put data into author objects
        console.log("this country: ", this.country);
      }); // subscribe
    }

    updateCountry(id){
      console.log("NEW COUNTRY INFO:", this.country);
      console.log("id:", id);
      let observable = this._httpService.updateCountry(id, this.country);
      observable.subscribe(country => {
        console.log("editing country", this.country);
        //go to another route?
        this._router.navigate(['home']);
      })
    }
}
