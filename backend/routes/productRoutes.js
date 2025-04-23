const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // user Database save
    res.send("no no ");
});

router.get('/all', (req, res) => {
    // user Database save
    res.send("this is all");
});

router.get('/one/test', (req, res) => {
    // user Database save
    res.send("this is test");
});

// Example route: Get all users
router.post('/', (req, res) => {
    res.send("products");
});

router.put('/', (req, res) => {
    res.send("products");
});

router.delete('/', (req, res) => {
    res.send("products");
});

module.exports = router;
