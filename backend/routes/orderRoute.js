const express = require("express");
const {
  isAuthenticatedUser,
  authorizeRole
} = require("../middleware/auth");
const {
  createNewOrder,
  getSingleOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  myOrders,
} = require("../controllers/orderControler");
const router = express.Router();
router.route("/order/new").post(isAuthenticatedUser, createNewOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateOrder)
  .delete(isAuthenticatedUser, deleteOrder, authorizeRole("admin"));

module.exports = router;
