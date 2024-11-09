const Book = require('../model/book');
const Author = require('../model/author');
const Genre = require('../model/genre');
const fs = require('fs')

exports.createBook = async (req, res) => {
    try {
        const { book_name, author_name, genre_name, rating } = req.body;

        const imagePath = req.file.path.replace(/\\/g,'/');
        
        // Check if the book already exists
        const existingBook = await Book.findOne({ book_name });
        if (existingBook) return res.status(400).json({ message: "Book already exists" });

        const existingAuthor = await Author.findOne({ author_name });
        if (!existingAuthor) return res.status(400).json({ message: "Author not found" });

        const existingGenre = await Genre.findOne({ genre_name });
        if (!existingGenre) return res.status(400).json({ message: "Genre not found" });

        const newBook = new Book({ book_name, author: existingAuthor._id, genre: existingGenre._id, rating , 
            image:"http://localhost:5000/"+imagePath});
        await newBook.save();

        existingAuthor.books.push(newBook._id)
        existingGenre.books.push(newBook._id)
        await existingAuthor.save();
        await existingGenre.save();

        res.status(201).json({ book: newBook });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getBook = async (req, res) => {
    try {
        const { bookId } = req.params;

        const book = await Book.findById(bookId).populate('author').populate('genre');
        if (!book) return res.status(404).json({ message: "Book not found" });

        res.json({ book });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author').populate('genre');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { book_name, author_name, genre_name, rating, image } = req.body;
        let query = {};  // Initialize query object

        const findBook = await Book.findById(bookId);
        if (!findBook) return res.status(404).json({ message: "Book not found" });
        const file = findBook.image.replace(/^http:\/\/localhost:5000\//, '');
        fs.unlink(file)

        // Conditionally add fields to the query object if provided in req.body
        if (book_name) query.book_name = book_name;
        if (author_name) {
            const updatedAuthor = await Author.findOne({ author_name });
            if (!updatedAuthor) return res.status(404).json({ message: "Author not found" });
            query.author = updatedAuthor._id;
        }
        if (genre_name) {
            const updatedGenre = await Genre.findOne({ genre_name });
            if (!updatedGenre) return res.status(404).json({ message: "Genre not found" });
            query.genre = updatedGenre._id;
        }
        if (rating) query.rating = rating;
        if (image) {
            query.image = "http://localhost:5000/"+imagePath;
        }
        const updatedBook = await Book.findByIdAndUpdate(bookId, query, { new: true });
        res.json({ message: "Book updated successfully", updatedBook });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;

        const deletedBook = await Book.findByIdAndDelete(bookId);
        const file = deletedBook.image.replace(/^http:\/\/localhost:5000\//, '');
        fs.unlink(file)
        if (!deletedBook) return res.status(404).json({ message: "Book not found" });

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
