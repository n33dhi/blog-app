const express = require('express');
const router = express.Router();

const { RegisterUser, Login } = require('../controller/userController');

router.post('/register', RegisterUser);
router.post('/login', Login);

module.exports = router;