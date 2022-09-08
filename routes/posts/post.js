const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../../controller/postcontroller');

router.post('/create' , passport.checkAuthentication ,  postsController.create);



module.exports = router;