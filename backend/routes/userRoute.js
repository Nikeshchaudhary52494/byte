const express = require("express");
const {
  registerUser,
  loginUser,
  logoutuser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  verifyUser,
} = require("../controllers/userController.js");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/verify/:token").get(verifyUser)
router.route("/login").post(loginUser);
router.route("/logout").get(logoutuser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);
router
  .route("/admin/getAllUser")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllUsers);
router
  .route("/admin/getUser/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser);
router
  .route("/admin/updateuserrole/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateUserRole);

module.exports = router;
