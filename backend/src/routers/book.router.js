const express = require('express')
const router = express.Router()

const Book = require('../controllers/book.controller');
const Author = require('../controllers/author.controller');
const Category = require('../controllers/category.controller');
const Publisher = require('../controllers/publisher.controller');

// Books
router.get('/', Book.index);
router.post('/', Book.create);
router.delete('/:id', Book.delete);
router.put('/:id', Book.update);

// Authors
router.get('/author', Author.index);
router.post('/author', Author.create);
router.delete('/author/:id', Author.delete);
router.put('/author/:id', Author.update);

// Categories
router.get('/category', Category.index);
router.post('/category', Category.create);
router.delete('/category/:id', Category.delete);
router.put('/category/:id', Category.update);

// publishers
router.get('/publisher', Publisher.index);
router.post('/publisher', Publisher.create);
router.delete('/publisher/:id', Publisher.delete);
router.put('/publisher/:id', Publisher.update);

module.exports = router