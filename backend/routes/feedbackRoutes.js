// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbacksystemController = require("../controller/feedbackController");

router.get('/getdata', feedbacksystemController.data);

module.exports = router; // ✅ must export router
