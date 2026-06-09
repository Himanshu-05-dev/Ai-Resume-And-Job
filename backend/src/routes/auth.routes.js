const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware')

const authRouter = express.Router()

/**
 *  @route Post /api/auth/register
 * @description register a new user
 * @access  Public
 */

authRouter.post("/register",authController.registerUserController)

/**
 * @route Post /api/auth/login
 * @description login user with email and password
 * @access public
 */

authRouter.post("/login",authController.loginUserController)


/**
 * @route GEt/ api /auth/logout
 * @description clear token from user cookie ans token blacklist
 * @access Public
 */

authRouter.get("/logout",authController.logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get the current login user details
 * @access Private
 */

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)




module.exports = authRouter;