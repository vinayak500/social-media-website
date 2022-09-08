
const post = require('../models/post');

module.exports.home = function(req , res){

    // populate the user of each part
    post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
                path:'user'
        }
       }
       ).exec(function(err,posts){
    return res.render('home' ,{
        title:'Codeial',
        posts : posts
    });
});
}; 

