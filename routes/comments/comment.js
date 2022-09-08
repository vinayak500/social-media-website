const express = require('express');
const router = express.Router();
const passport = require('passport');

const CommentsController = require('../../controller/commentcontroller');

router.post('/create' , passport.checkAuthentication , CommentsController.create);



module.exports = router;