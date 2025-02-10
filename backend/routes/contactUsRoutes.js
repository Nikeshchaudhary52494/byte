const express = require("express");

const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const { createMessage, getAllMessages, deleteMessageById } = require("../controllers/contactUsControler");

const router = express.Router();


router
    .route("/contactus")
    .post(isAuthenticatedUser, createMessage);
router
    .route("/admin/messages")
    .get(isAuthenticatedUser, authorizeRole("admin"), getAllMessages);
router
    .route("/admin/message/:id")
    .delete(isAuthenticatedUser, authorizeRole("admin"), deleteMessageById);


module.exports = router;