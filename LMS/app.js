const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')
const app = express();
var signlogin = require('./signup-login/signuplogin');
app.set('views','./views');
app.use('/public',express.static(__dirname + '/public')); //Serves resources from public folder
app.set('view engine','ejs');

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/signuplogin', signlogin);
var user_Data={};
/*################################## 
  ##Setting up connection to Mongo## 
  ##################################*/
const mongoose = require('mongoose');
const user = require('./models/user');
const { restart } = require('nodemon');
mongoose.connect('mongodb+srv://ritik:BIGGBOss12@cluster0.m96r8.gcp.mongodb.net/testing?retryWrites=true&w=majority',{
                useNewUrlParser:true,
                useCreateIndex:true,
                useUnifiedTopology:true
                }).then(()=>{
                        console.log('connected to db');
                        }).catch(err=>{
                        console.log('error'.err);
                        });
                                                




/*####################################
  #######Creating Requests############ 
  ####################################*/
/*#################################### 
  #########Sign in sign up req######## 
  #################################### */
app.get('/',function(req,res){
    res.render('signin');
})
app.get('/signup',function(req,res){
    res.render('signup');
})
/*#################################### 
  Sign in and sign up################# 
  ####################################*/
app.post('/savedatatomongo',function(req,res){
    //console.log(req.body);
    let obj={
      username:req.body.name,
      email:req.body.email,
      password:req.body.pass
    }
    user.create(obj,function(err,user){
      if(err){
        console.log('There has been an error: '+err);
      }else{
        console.log('User was created: '+user);
        res.redirect('/');
      }
    })
})
app.post('/checkdata',function(req,res){
  let obj={
    email:req.body.email,
    password:req.body.pass
  }
  user.find(obj,function(err,user){
    
    console.log(user[0]);
    if(err){
      res.redirect(403,'/');
    }else{
      user_Data=user[0];
      res.redirect('/dashboard/user/'+user[0]._id);
    }
  })
})

/*####################################### 
  ############DASHBOARD##################
  #######################################*/
app.get('/dashboard/user/:user_id',function(req,res){
    console.log(user_Data.username);
    res.render('studentdashboard.ejs',{name:user_Data.username});
    
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Yeah I am connected");
  });
  
  module.exports = app;