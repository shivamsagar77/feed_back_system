const express = require('express');
const router = express.Router();
const feedbacksystemController = require("../controller/feedbackController");

router.get('/getdata', feedbacksystemController.data);
router.post('/add', feedbacksystemController.postData);
router.put('/update/:id', feedbacksystemController.updateData);
router.delete('/delete/:id', feedbacksystemController.deleteData);

module.exports = router;
