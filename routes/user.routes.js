const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');




// authentification
// http://localhost:5000/api/user/register
router.post("/register", authController.signUp);

// user db
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.delete("/:id", userController.deleteUser);

module.exports = router;