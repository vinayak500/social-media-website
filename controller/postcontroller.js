const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req , res){
    // Post.create({
    //     content: req.body.content ,
    //     user : req.user._id
    // } , function(err, post){
    //     if(err){console.log('error in creating a post'); return; }
    //     return res.redirect('back');
    // })



    try{
        await Post.create({
            content: req.body.content ,
            user : req.user._id
        });

        return res.redirect('back');
    }
    catch(err){
        console.log('Error' + err);
    }
}

module.exports.destroy = async function(req , res){
    // Post.findById(req.params.id , function(err , post){
        // post.user is the id , 
        // .id means converting object is to string 
    //     console.log(post.user);
    //     console.log(req.user.id);
    //     if(post.user == req.user.id){
    //            post.remove();
    //            Comment.deleteMany({post : req.params.id} , function(err){
    //                    return res.redirect('back');
    //            });

    //     } else{
    //         return res.redirect('back');
    //     }
    // })





    try{
        let  posts = await Post.findById(req.params.id);
        if(posts.user == req.user.id){
            posts.remove();
           await  Comment.deleteMany({post : req.params.id});
                    return res.redirect('back');
                } else{
                    return res.redirect('back');
                }
               }
               catch(err){
                   console.log('Error' + err);
               }


}