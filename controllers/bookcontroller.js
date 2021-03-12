var Book = require('../models/book');

const bookApiController = {};
bookApiController.getAllBooks = async(req, res) => {
    // get all books
    const books = await Book.find();
    res.json(books);
}
bookApiController.getBook = async (req,res) =>{
    try {
        // get one book by id 
        const book = await Book.find({_id:req.params.id});
        res.json(book);
    } catch (error) {
        res.status(400).json(error);
    }
}

bookApiController.createBook = async(req, res) => {
    //create a new book
    try {
    var book = await new Book(req.body).save();
    res.json({ "message": "create book",book });
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
    
}

bookApiController.updateBook = async(req, res) => {
    //update book by id 
    try {
        let condition = {};
        if(req.body._id){
            condition._id = req.body._id;
        }
        console.log(condition);
        const result =await Book.updateOne(condition,{...req.body});
            res.json({ "message": "update book" ,result});
        
        
    } catch (error) {
     console.log(error);
     res.status(400).json(error);   
    }
   
}

bookApiController.deleteBook =async (req, res) => {
    //delete book by id
    try {
        console.log(req.params.id);
    const result =  await Book.deleteOne({_id:req.params.id});
    res.json({ "message": "delete book" , result });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
    
}


module.exports = bookApiController;

