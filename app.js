var express=require('express');
var http=require('http');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var router=require('./routes/User');
var mongoose=require('mongoose');
var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds123499.mlab.com:23499/databasemy',{ useMongoClient: true });

mongoose.connection.on('connected',()=>{
    console.log("Connected to database mongodb @27017");
});
mongoose.connection.on('error',(err)=>{
if(err)
{
    console.log('error in database connection:'+err);
}
});
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
//app.engine('html', ejs.renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('port', (process.env.PORT || 9192));
app.use('/', router);
app.use('/user',router);
app.listen(app.get('port'), function(){
    console.log("Server start....."+app.get('port'));
});