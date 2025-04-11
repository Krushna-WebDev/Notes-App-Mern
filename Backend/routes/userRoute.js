const express = require('express');
const router = express.Router();
const  { login, register,user } =require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/login',login)
router.post('/register',register)
router.post('/userdetail',authMiddleware,user)

module.exports = router;