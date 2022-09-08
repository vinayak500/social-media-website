const express = require('express');
const router = express.Router();
const usercontroller = require('../../controller/usercontroller');
const passport = require('passport');

router.get('/profile' , passport.checkAuthentication ,  usercontroller.profile );
router.get('/sign-up' , usercontroller.signup );
router.get('/sign-in' , usercontroller.signin );

router.post('/create' , usercontroller.create );
// router.post('/create-session' , usercontroller.createsession );


//use passport as middleware to authenticate
router.post('/create-session' , passport.authenticate(
    'local' ,
    {failureRedirect: '/user/sign-in'},
) , usercontroller.createsession);


router.get('/sign-out' , usercontroller.destroysession );

module.exports = router;