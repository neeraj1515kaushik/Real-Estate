const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
//const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

  // Map global promise - get rid of warning
    mongoose.Promise = global.Promise;
  // Connect to mongoose
    mongoose.connect('mongodb://localhost/estate-dev', {
    useMongoClient: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

     const port = 5000;
  //Load Idea Model
     require('./models/Idea');
     const Idea = mongoose.model('ideas');

  //Load Idea Model
     require('./models/User');
     const User = mongoose.model('users');
    
  // Static folder
  app.use(express.static(path.join(__dirname, 'public')));


                          //Handlebars Middleware
                            app.engine('handlebars', exphbs({
                                  defaultLayout:'main'
                            }));
                            app.set('view engine', 'handlebars');

  // parse application/x-www-form-urlencoded
     app.use(bodyParser.urlencoded({ extended: false }))

                            // parse application/json
                              app.use(bodyParser.json())

                              app.get('/', (req, res)=>{
                                    res.render('HOME');
                              });
                              app.get('/about', (req, res)=>{
                                    res.render('ABOUT');
                              });
                              app.get('/bookonline', (req, res)=>{
                                    res.render('BoOk online');
                              });
                              app.get('/users/login', (req, res)=>{
                                res.render('login');
                              });
                              app.get('/users/register', (req, res)=>{
                                res.render('register');
                              });

  // Idea index page
     app.get('/ideas', (req, res)=>{
          Idea.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
          .sort({date: 'desc'})
          .then(ideas => {
               res.render('index', {
                    ideas : ideas
               });
          });
          
     });

              // Process form
                app.post('/ideas', (req, res) =>{
                      // for server side
                      let errors = [];//object it is

                      if(!req.body.fullname){
                          errors.push({text:'please add your fullname'}); //object has a function push
                      }
                      if(!req.body.email){
                          errors.push({text:'please add your id'});
                      }
                      if(!req.body.message){
                          errors.push({text:'please add your message'});
                      }
                      if(errors.length > 0){
                          res.render('home', {
                                errors: errors,
                                fullname: req.body.fullname,
                                email: req.body.email,
                                message: req.body.message
                          });
                      } else {
                          // for database
                          const newUser = {
                                fullname: req.body.fullname,
                                email: req.body.email,
                                message: req.body.message
                          }
                          new Idea(newUser)
                          .save()
                          .then(idea =>{
                                res.redirect('/ideas');
                          })
                      }
                });


     app.listen(port , () =>{
          console.log(`server started on port ${port}`);
     });




                // Register Form POST
                  app.post('/register', (req, res)=>{
                    let errors = [];

                    if(req.body.password != req.body.password2){
                      errors.push({text:'Passwords Do not match'});
                    }
                    
                    if(req.body.password.length < 4){
                      errors.push({text:'Atleast 4 Characters'});
                    }
                    //this is used as not to re write the details again and again
                    if(errors.length > 0){
                      res.render('/register', {
                            errors: errors,
                            fullname: req.body.name,
                            email: req.body.email,
                            
                      });
                    }
                    else{
                      const newUser = {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                      }
                      console.log(newUser);
                      
                    }
                  });