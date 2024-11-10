const express = require("express");
const authController = require("../controllers/authController");
const { identifier } = require("../middlewares/identification");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "newuser"
 *               password: "securepassword123"
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 */
router.post("/signup", authController.signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "existinguser"
 *               password: "mypassword"
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/signin", authController.signin);

/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: Sign out the currently logged-in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []  # if using bearer token authentication
 *     responses:
 *       200:
 *         description: User signed out successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/signout", identifier, authController.signout);

/**
 * @swagger
 * /api/auth/send-verification-code:
 *   patch:
 *     summary: Send a verification code to the user's email
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Verification code sent successfully
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/send-verification-code",
  identifier,
  authController.sendVerificationCode
);

/**
 * @swagger
 * /api/auth/verify-verification-code:
 *   patch:
 *     summary: Verify the user's email with the verification code
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Verification successful
 *       400:
 *         description: Invalid code
 */
router.patch(
  "/verify-verification-code",
  identifier,
  authController.verifyVerificationCode
);

/**
 * @swagger
 * /api/auth/change-password:
 *   patch:
 *     summary: Change the user's password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               oldPassword: "oldpassword123"
 *               newPassword: "newpassword123"
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid input
 */
router.patch("/change-password", identifier, authController.changePassword);

/**
 * @swagger
 * /api/auth/send-forgot-password-code:
 *   patch:
 *     summary: Send a password reset code to the user's email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: "user@example.com"
 *     responses:
 *       200:
 *         description: Reset code sent successfully
 *       404:
 *         description: User not found
 */
router.patch(
  "/send-forgot-password-code",
  authController.sendForgotPasswordCode
);

/**
 * @swagger
 * /api/auth/verify-forgot-password-code:
 *   patch:
 *     summary: Verify the password reset code and allow password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               code: "654321"
 *               newPassword: "newpassword123"
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid code or password format
 */
router.patch(
  "/verify-forgot-password-code",
  authController.verifyForgotPasswordCode
);

module.exports = router;
