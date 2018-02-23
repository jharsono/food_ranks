import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
params: any;
country: any;
dishes: any;
  constructor(private _httpService: HttpService,
            private _route: ActivatedRoute, //allow you to get params
            private _router: Router
      ){ }

  ngOnInit() {
    this.country = {} //insantiate the object
    this.dishes = {}

    this._route.params.subscribe((params: Params) => this.params= params); //retrieve params and save
    this.getOneCountry(this.params.id); //pass in the params and get the country
    this.getDishes(this.params.id); //pass in the params and get the dishes for that country

  }
  getOneCountry(id) {
    let observable = this._httpService.getOneCountry(id); //getCountry is invoked from http.service
    observable.subscribe(data => {
        console.log("Got our data!", data);
        this.country = data; //put data into author objects
        console.log("this country: ", this.country);
      }); // subscribe
    }

  getDishes(id) {
    let observable = this._httpService.getDishes(id);
    observable.subscribe(response => {
      let data = response as any; //cast response as any
      console.log("got the dishes", data);
      this.dishes = data.success;
      console.log("THIS.DISHES:", this.dishes)

    })
  }

  deleteDish(id){
    let observable = this._httpService.deleteDish(id);
    observable.subscribe( data => {
      this.getDishes(this.params.id);
    });
  }

upvoteDish(dish) { // send the entire object!
  console.log("IN THE COMPONENT")
  dish.votes += 1; // update just this property in the object
  console.log("votes:", dish.votes)
  let observable = this._httpService.updateVotes(dish); // send the newly updated obj to service
  observable.subscribe(dish => {
    console.log("upvoting dish", this.dishes);
    //go to another route?
    this._router.navigate(['/country/', this.params.id]);
  })
}

  downvoteDish(dish) {
    console.log("IN THE COMPONENT")
    dish.votes -= 1;  // update just this property in the object
    console.log("votes:", dish.votes)
    let observable = this._httpService.updateVotes(dish);
    observable.subscribe(dish => {
      console.log("downvoting dish", this.dishes);
      //go to another route?
      this._router.navigate(['/country/', this.params.id]);
    })
  }
}
