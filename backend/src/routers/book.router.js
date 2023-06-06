const express = require('express')
const router = express.Router()

const Book = require('../controllers/book.controller');
const Author = require('../controllers/author.controller');
const Genre = require('../controllers/genre.controller');
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

// genres
router.get('/genre', Genre.index);
router.post('/genre', Genre.create);
router.delete('/genre/:id', Genre.delete);
router.put('/genre/:id', Genre.update);

// publishers
router.get('/publisher', Publisher.index);
router.post('/publisher', Publisher.create);
router.delete('/publisher/:id', Publisher.delete);
router.put('/publisher/:id', Publisher.update);

module.exports = router