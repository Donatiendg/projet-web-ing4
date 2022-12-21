var express = require('express');
var router = express.Router();

const multer = require('multer');
const upload = multer();
var usersController = require('../controllers/users');

router.get('/users', usersController.getAllUsers);
router.post("/users", upload.none(), usersController.newUser);
//router.post('/users', usersController.newUser);
router.delete('/users', usersController.deleteAllUsers);


router.get('/users/:name', usersController.getOneUser);
router.post('/users/:name', usersController.newComment);
router.delete('/users/:name', usersController.deleteOneUser);

module.exports = router;