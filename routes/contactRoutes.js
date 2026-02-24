const express = require('express');
const router = express.Router();
const { getContact, updateContact, resetContact } = require('../controllers/contactController');
const { protect, verifyAdmin } = require('../middleware/authMiddleware');

router.get('/', getContact);
router.put('/', protect, verifyAdmin, updateContact);
router.post('/reset', protect, verifyAdmin, resetContact);

module.exports = router;