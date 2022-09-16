
const User = require('../models/user');

module.exports.signup = function(req , res){

     if(req.isAuthenticated()){
      res.redirect('/user/profile');
     }



    return res.render('user_sign_up' ,{
        title:'codeial!'
    });
}; 

module.exports.signin = function(req , res){

  if(req.isAuthenticated()){
    res.redirect('/user/profile');
   }

  return res.render('user_sign_in' ,{
        title:'codeial!'
    });
}; 


module.exports.destroysession = function(req , res){

  //logout function is given to request by passport
  req.logout(function(err) {
    if (err) { return next(err); }
     
    req.flash('success' , 'You have logged out');
    res.redirect('/');
  });
}; 



module.exports.profile = function(req , res){
  // if(req.cookies.user_id)
  // {
  //     User.findById(req.cookies.user_id , function(err, user){
  //       if(user)
  //       {
  //         console.log(user);
  //         return res.render('user_profile' ,{
  //           title: "User Profile",
  //           user: user
  //         })
  //       }else{
  //         return res.redirect('/users/sign-in');
  //       }

  //       // return res.redirect('/users/sign-in');
  //     });
  // }
  // else{
  //   return res.redirect('/users/sign-in');
  // }

if(req.params.id){
  User.findById(req.params.id , function(err , user){
    return res.render('user_profile' , {
         title: "User Profile" ,
         profile_user: user 
   });
})
}
else{
  return res.render('user_profile' , {
    title: "User Profile" ,
    profile_user: req.user
});
}



};


module.exports.create = function(req , res){
    if(req.body.password != req.body.confirm_password)
    {
     return res.redirect('back');
    }
  User.findOne({email:req.body.email} , function(err , user) {
        if(err){console.log('error in finding user in signing up'); return;
       }

       if(!user)
       {
        User.create(req.body , function(err , user){
             if(err){console.log('error in creating user while signing up'); return;}

             return res.redirect('/user/sign-in');

            });
       }else{
        return res.redirect('back');
       }
  })
}; 

module.exports.createsession = function(req , res){
//      //steps to authenticate
//      //find the user 
//      User.findOne({email:req.body.email} , function(err,user){

//         if(err){console.log('error in finding user in signing up'); return;}

//      //handle user found
//              if(user)
//              {
//  //handle password which dont match
//               if(user.password != req.body.password)
//               {
//                 return res.redirect('back');
//               }
//                //handle session creation
//                     res.cookie('user_id',user._id);
//                     return res.redirect('/user/profile');
//              }else
//              {
//                //handle user not found
//               return res.redirect('back');
//              }


//       })



   res.redirect('/');
}; 


module.exports.update = async function(req , res){
  // if(req.user.id == req.params.id){
  //   User.findByIdAndUpdate(req.params.id , req.body ,function(err , user){
  //        return res.redirect('/');
  //   })
  // }else{
  //   return res.status(401).send('Unauthorised');
  // }




  if(req.user.id==req.params.id){

    try{
         let user=await User.findById(req.params.id);
         User.uploadedAvatar(req,res,function(err){
                if(err){console.log('*******Multer Error' , err);}
    
    
                user.name = req.body.name;
                user.email = req.body.email;
    
                if(req.file){
                   //this is saving the path of uploaded file into avatar feild in the user
                   user.avatar=User.avatarPath + '/' + req.file.filename;
                }
                          user.save();
                          req.flash('success' , 'profile updated');
                          return res.redirect('back');
              //   console.log(req.file);
    
         });
    
    }catch(err){
         req.flash('error',err);
                return res.redirect('back');
    }
    
    }
    else{
         req.flash('error' , 'Unauthorised');
         return res.redirect('back');
    }
    
    



};