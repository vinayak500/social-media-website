const express = require('express');
const router = express.Router();
const usercontroller = require('../../controller/usercontroller');

router.get('/profile' , usercontroller.profile );
router.get('/sign-up' , usercontroller.signup );
router.get('/sign-in' , usercontroller.signin );
router.post('/create' , usercontroller.create );
router.post('/create-session' , usercontroller.createsession );

module.exports = router;