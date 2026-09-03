const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { generateContent } = require('../controllers/aiController');

// All AI routes require authentication (but not necessarily admin)
router.use(protect);

router.post('/generate', generateContent);

module.exports = router;
