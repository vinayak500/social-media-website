const express = require('express');
const router = express.Router();
const homecontroller = require('../controller/homecontroller');

router.get('/' , homecontroller.home );
router.get('/home' , homecontroller.home );
router.use('/user' , require('./user/user'));
router.use('/posts' ,require('./posts/post'));
router.use('/comments' , require('./comments/comment'))
module.exports = router;