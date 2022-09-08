const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


const cookieParser = require('cookie-parser');

app.use(express.urlencoded());

app.use(cookieParser());

//search for all the css , js , image file in assets folder
app.use(express.static('./assets'));

app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

//set layout.ejs on all the pages using middleware
app.use(expressLayouts);

//tell the app we are using ejs as view engine , and search for ejs file in views folder
app.set('view engine' , 'ejs');
app.set('views' , './views');

app.use('/' , require('./routes/index'));


app.listen(port , function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
}); 

