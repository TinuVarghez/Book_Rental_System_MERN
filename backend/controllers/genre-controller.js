const Genre = require('../model/genre')

exports.createGenre = async (req,res)=>{
    try {
        const { genre_name } = req.body;

        const existingGenre = await Genre.findOne({ genre_name });
        if (existingGenre) return res.status(400).json({ message: "Genre already exists" });

        const newGenre = new Genre({ genre_name });
        await newGenre.save();

        res.status(201).json({ Genre: newGenre});
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getGenre = async (req,res)=>{
    try {
        const { genreId } = req.params;

        const getGenre = await Genre.findById(genreId).populate('books');
        if (!getGenre) return res.status(404).json({ message: "Genre not found" });

        res.json({ Genre: getGenre });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


exports.getAllGenre = async (req,res)=>{
    try {
        const genres = await Genre.find().populate('books');
        res.json({genres:genres});
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.updateGenre = async (req,res)=>{
    try {
        const { genreId } = req.params;
        const updates = req.body;

        const updatedGenre = await User.findByIdAndUpdate(genreId, updates, { new: true });
        if (!updatedGenre) return res.status(404).json({ message: "Genre not found" });

        res.json({ message: "Genre updated successfully", updatedAuthor });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteGenre = async (req,res)=>{
    try {
        const { genreId } = req.params.id;

        const deletedGenre = await User.findByIdAndDelete(genreId);
        if (!deletedGenre) return res.status(404).json({ message: "Genre not found" });

        res.json({ message: "Genre deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
