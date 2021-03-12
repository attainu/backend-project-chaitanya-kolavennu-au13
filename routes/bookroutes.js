var express = require('express');
var router = express.Router();
var path = require('path');
const { authenticate } = require('../middlewares/authenticate')

const bookController = require("../controllers/bookcontroller");
//get book list.
router.get('/', authenticate, bookController.getAllBooks);
//get book detail by id.
router.get('/:id', authenticate,bookController. getBook);
//post a new book.
router.post('/', authenticate, bookController.createBook);
//update book by id
router.put('/', authenticate, bookController.updateBook);
//delete book by id
router.delete('/:id', authenticate, bookController.deleteBook);


module.exports = router;

