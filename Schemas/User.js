var mongoose=require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{
      type:String,
    },
    first_name: {
        type:String,
    },
    last_name:{
      type:String,
    },
    email_id:{
        type:String,
    },
    password:{
        type:String,
    },
    date_of_birth:{
        type:Date,default: Date.now,
    },
    gender:{
        type:String,
    }
});

var AddressSchema=mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
street:{
    type:String,
},
city:{
    type:String,
},
district:{
    type:String,
},
country:{
    type:String,
},
pin_code:{
    type:Number,
},
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'UserSchema'
}
});
var Address=mongoose.model('address',AddressSchema);
   
var User=mongoose.model('user',UserSchema);

module.exports={
    Address:Address,
    User:User,
    CreateAddress:function(address,callback)
    {
        console.log(address);
        address.save(callback);
    },
   CreateUser:function(newUser,callback){
    bcrypt.genSalt(10,function(err,salt){
 bcrypt.hash(newUser.password,salt,function(err,hash){
newUser.password=hash;
newUser.save(callback);
 });
    });
}
};
