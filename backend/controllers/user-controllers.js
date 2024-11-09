const User = require('../model/user')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');

exports.createUser = async (req,res)=>{
    try {
        const { username, password, role } = req.body;

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log(errors);
            throw new HttpError('Invalid inputs passed, check your data',422);
        }
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new User({ username, password: hashedPassword, role});
        await newUser.save();

        res.status(201).json({ user: newUser});
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.loginUser = async (req,res)=>{
    try {
        const { username, password, role } = req.body;

        // Find user by username
        const user = await User.findOne({ username, role });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate token
        // const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({user:user});
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getAllUser = async (req,res)=>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.updateUser = async (req,res)=>{
    try {
        const { userId } = req.params;
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteUser = async (req,res)=>{
    try {
        const { userId } = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
