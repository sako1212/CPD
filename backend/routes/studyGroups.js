const express = require('express');
const router = express.Router();

// Example test route
router.get('/', (req, res) => {
res.send('Study groups route is working!');
});

module.exports = router;
