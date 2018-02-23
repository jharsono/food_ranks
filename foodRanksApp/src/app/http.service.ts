import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) { }
    getAllCountries(){
     // our http response is an Observable, store it in a variable
     // let tempObservable = this._http.get('/tasks');
     // // subscribe to the Observable and provide the code we would like to do with our data from the response
     // tempObservable.subscribe(data => console.log("Got our tasks!", data));
     return this._http.get('/show-all');
   }
   new(country) {
     return this._http.post('/newCountry', country);
   }

   delete(id) {
     console.log("about to delete country:", id);
     return this._http.delete(`/delete/${id}`);
   }

   getOneCountry(id) {
        return this._http.get('/countries/' + id);
    }

    updateCountry(id, updatedCountry) {
      console.log("in the service")
      return this._http.put(`/updatecountry/${id}`, updatedCountry);
    }

    addDish(id, newDish) {
      console.log("in the service");
      console.log("id", id)
      return this._http.post(`/newdish/${id}`, newDish);
    }

    getDishes(id) {
      return this._http.get('/dishes/' + id)
    }

   updateVotes(dish) { // updated object gets sent with ID and entire obj
     console.log("IN THE SERVICE:", dish)
       return this._http.put(`/dishes/${dish._id}/vote`, dish);
   }


    deleteDish(id) {
        let url = '/delete-dish/' + id;
        return this._http.delete(url);
    }

}
