// ########################CONFIG########################

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(express.static( __dirname + '/foodRanksApp/dist' ));

// ########################################################


// ########################MONGOOSE########################

mongoose.connect('mongodb://localhost/food_ranks');
mongoose.set('debug', true)
let Schema = mongoose.Schema;

let countrySchema = new mongoose.Schema({
    name: {required: true, type: String, minlength: [3, "Country name length needs to be greater than 3 characters"]},
    imageUrl: {required: true, type: String, minlength: [3, "URL length needs to be greater than 3 characters"]},
    dishes: [{type: Schema.Types.ObjectId, ref: 'dish'}]
}, {timestamps: true});

let dishSchema = new mongoose.Schema({
  _country: {type: Schema.Types.ObjectId, ref: 'country'},
    votes: {type: Number},
    name: {required: true, type: String, minlength: [3, "Dish name length needs to be greater than 3 characters"]},
    desc: {required: true, type: String, minlength: [3, "Dish name length needs to be greater than 3 characters"]},
    imageUrl: {required: true, type: String, minlength: [3, "URL length needs to be greater than 3 characters"]},

}, {timestamps: true});

mongoose.model('country', countrySchema);
mongoose.model('dish', dishSchema);
var Country = mongoose.model('country');
var Dish = mongoose.model('dish');

// ########################################################

// ########################Routes########################
// // Root Request

// //get all countries
app.get('/show-all', function(req, res) {
    Country.find({}, function(err, data) {
        if (err) {
          console.log('got an error');
        res.json({error: err});
        }
        else {
        console.log('showing all countries');
        res.json({message: "success", countries: data});
      }
  })
})

app.get('/all-dishes', function(req, res) {
    Dish.find({}, function(err, data) {
        if (err) {
          console.log('got an error');
        res.json({error: err});
        }
        else {
        console.log('showing all dishes');
        res.json({message: "success", dishes: data});
      }
  })
})

//new country
app.post('/newCountry', function(req, res) {
  var newCountry = new Country({
    name: req.body.name,
    imageUrl: req.body.imageUrl
  }) //".body" is the entire object you sent in from the service
   console.log("IN THE SERVER: ", req.body.name)
  newCountry.save(function(err, results) {
    console.log("AFTER SAVE: ", results);
    if (err) {
      console.log(err);
    } else {
      console.log('successfully added a country');
      res.json({success: results});
      }
  })
})

// delete country
app.delete('/delete/:id', function(req, res) {
  console.log("server deleting: ", req.params.id)
   Country.findByIdAndRemove(req.params.id, function(err, results) {
     if(err) {
       res.json({error: err})
     } else {
       console.log('successfully deleted');
       res.json({success:results})
     }
   })
})
// show one country
app.get('/countries/:id', function(req, res){
  console.log("id:", req.params.id)
    Country.findById(req.params.id, function(err, data){
        if (err) {
            console.log(err);
            res.json({error: err});
        } else {
            res.json(data);
        }
    });
});
//
// //ADD QUOTE to this author - votes start at 0
// app.post('/authors/:id/dishes', function(req, res) {
//     var quote = {text: req.body.text, votes: 0}
//     Country.update({_id: req.params.id}, { $push: { dishes: quote}}, function(err, results) {
//         if (err) {
//             console.log(err);
//             res.json({error: err});
//         } else {
//             res.json({success: results});
//         }
//     });
// });
//
//update country
app.put('/updatecountry/:id', function(req, res) {
  var country = {name: "", imageUrl: ""};
  country.name = req.body.name;
  country.imageUrl = req.body.imageUrl;
    Country.findOneAndUpdate({_id: req.params.id}, country, function(err, data) {
      if (err) {
        res.json({error: err});
        console.log("error updating country", err);
      } else {
        res.json({success: data});
    }
  })
})

//add dish
app.post('/newdish/:id', function (req, res){
  Country.findById({_id: req.params.id}, function(err, country){
         var dish = new Dish({
           name: req.body.name,
           desc: req.body.desc,
           imageUrl: req.body.imageUrl,
           votes: 0
            }
         );
         dish._country = country._id;
         country.dishes.push(dish);
         dish.save(function(err){
                 country.save(function(err){
                       if(err) { console.log('Error'); }
                       else { res.json({success: country}); }
                 });
         });
   });
});

// GET DISHES FOR THE COUNTRY
app.get('/dishes/:id', function (req, res){
// the populate method is what grabs all of the comments using their IDs stored in the
// comment property array of the post document!
 Country.findOne({_id: req.params.id})
 .populate('dishes') //THIS IS CASE SENSITIVE
 .sort({votes: -1})
 .exec(function(err, dishes) {
   console.log("dishes:", dishes);
      res.json({success: dishes});
    })
});



// UPDATEVOTES
app.put('/dishes/:id/vote', function(req, res) { // capture the ID
  console.log("in the server", req.body)
  let dish = req.body //getting the whole object again
      Dish.findOneAndUpdate({_id: req.params.id}, dish, function(err, data) {
        if (err) { //find the ID from the req.params and pass in the object. Save it!
          res.json({error: err});
          console.log("error updating votes", err);
        } else {
          res.json({success: data});
      }
    })
  })


// delete dish
app.delete('/delete-dish/:id', function(req, res) {
  console.log("server deleting: ", req.params.id)
   Dish.findByIdAndRemove(req.params.id, function(err, results) {
     if(err) {
       res.json({error: err})
     } else {
       console.log('successfully deleted');
       res.json({success:results})
     }
   })
})


app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./foodRanksApp/dist/index.html"))
  });

//########################Start Server########################
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("Food Ranks listening on port 8000");
})
