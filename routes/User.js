var express=require('express');
var bcrpty=require('bcrypt');
var router=express.Router();
var model=require('../Schemas/User');
var mongoose=require('mongoose');
var session=require('client-sessions');
var path = require('path');

router.get('/',function(req,res){
     res.render('HomePage');
});

router.get('/register',function(req,res){
       res.render('Registration')
});

router.get('/login',function(req,res){
   res.render('/Login');
});

router.post('/Doregister',function(req,res){
    var _id=new mongoose.Types.ObjectId();
  var title=req.body.title;
  var first_name=req.body.first_name;
  var last_name=req.body.last_name;
  var email_id=req.body.email_id;
  var password=req.body.password;
  var date_of_birth=req.body.date_of_birth;
  var gender=req.body.gender;
  var street=req.body.street;
  var city=req.body.city;
  var district=req.body.district;
  var country=req.body.country;
  var pin_code=req.body.pin_code;
  var newUser=new model.User({
      _id:_id,
      title:title,
      first_name:first_name,
      last_name:last_name,
      email_id:email_id,
      password:password,
      date_of_birth:date_of_birth,
      gender:gender,

  });

  var address=new model.Address({
      _id:new mongoose.Types.ObjectId(),
      street:street,
      city:city,
      district:district,
      country:country,
      pin_code:pin_code,
      user:newUser._id
  });
  model.CreateUser(newUser,function(err,user){
        console.log(user);
    });
   model.CreateAddress(address,function(err,address){
           console.log(address);
    });
});
module.exports = router;