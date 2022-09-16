
const post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req , res){

    // populate the user of each part
    post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
                path:'user'
        }
       }
       ).exec(function(err,posts){
        User.find({} , function(err , users){
            return res.render('home' , {
                    title:'Codeial | Home' ,
                    posts : posts ,
                    all_users : users 
          });
     })
});
}; 

