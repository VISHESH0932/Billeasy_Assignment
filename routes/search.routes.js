const express = require('express');
const router = express.Router();
const { searchBooks } = require('../controllers/search.controllers');
router.get('/', searchBooks);


module.exports = router;