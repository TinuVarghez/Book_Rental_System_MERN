const Author = require('../model/author')

exports.createAuthor = async (req,res)=>{
    try {
        const { author_name } = req.body;

        // Check if user already exists
        const existingAuthor = await Author.findOne({ author_name });
        if (existingAuthor) return res.status(400).json({ message: "Author already exists" });

        const newAuthor = new Author({ author_name });
        await newAuthor.save();

        res.status(201).json({ Author: newAuthor});
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getAuthor = async (req,res)=>{
    try {
        const { authorId } = req.params;

        const getAuthor = await Author.findById(authorId).populate('books');
        if (!getAuthor) return res.status(404).json({ message: "Author not found" });

        res.json({ author: getAuthor });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


exports.getAllAuthor = async (req,res)=>{
    try {
        const authors = await Author.find().populate('books');
        res.json({authors:authors});
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.updateAuthor = async (req,res)=>{
    try {
        const { authorId } = req.params;
        const updates = req.body;

        const updatedAuthor = await User.findByIdAndUpdate(authorId, updates, { new: true });
        if (!updatedAuthor) return res.status(404).json({ message: "Author not found" });

        res.json({ message: "Author updated successfully", updatedAuthor });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteAuthor = async (req,res)=>{
    try {
        const { authorId } = req.params.id;

        const deletedAuthor = await User.findByIdAndDelete(authorId);
        if (!deletedAuthor) return res.status(404).json({ message: "Author not found" });

        res.json({ message: "Author deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
