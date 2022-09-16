
const post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req , res){

    // populate the user of each part
//     post.find({}).populate('user').populate({
//         path: 'comments',
//         populate: {
//                 path:'user'
//         }
//        }
//        ).exec(function(err,posts){
//         User.find({} , function(err , users){
//             return res.render('home' , {
//                     title:'Codeial | Home' ,
//                     posts : posts ,
//                     all_users : users 
//           });
//      })
// });


try{
    let posts = await post.find({}).populate('user').populate({
      path: 'comments',
      populate: {
              path:'user'
      }
     });

     let users = await User.find({});


     return res.render('home' , {
      title:'Codeial | Home' ,
      posts : posts ,
      all_users : users 
       });
      }    
catch(err) {
      console.log(err);
      }





}; 

