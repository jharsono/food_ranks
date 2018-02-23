import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  params: any;
  country: any;
  newDish: any;

    constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router
        ){ }

    ngOnInit() {
      this.country = {}
      this.newDish = {}
      this._route.params.subscribe((params: Params) => this.params= params);
      this.getOneCountry(this.params.id);

    }
    getOneCountry(id) {
      let observable = this._httpService.getOneCountry(id);
      observable.subscribe(data => {
          console.log("Got our data!", data);
          this.country = data;
          console.log("this country: ", this.country);
        }); // subscribe
      }

      addDish(id, newDish){
        console.log("this new dish", this.newDish);
        let observable = this._httpService.addDish(id, this.newDish); //pass the newTask into service
        observable.subscribe(dish => {
          console.log("adding a dish", dish);
          this._router.navigate(['/country/', id]);

        })
      }
}
