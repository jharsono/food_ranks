import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {
  newCountry = {name:"", imageUrl:""}; // bind new author

  constructor(private _httpService: HttpService, private router: Router){ }

  ngOnInit() {
  }
  
  addCountry(){
    console.log(this.newCountry);
    let observable = this._httpService.new(this.newCountry); //pass the newTask into service
    observable.subscribe(country => {
      console.log("adding a country", country);
      this.router.navigate(['/home']);

    })
  }

}
