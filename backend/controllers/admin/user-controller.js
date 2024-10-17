const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const createUser = async(req, res) => {
    const {userName, email, password, role, isActive} = req.body;
    try {
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.json({
                success: false,
                message: "User already exsist with the same email! Please try again"
            })
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, email, password: hashPassword, role, isActive
        });
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Create successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

const getAllUser = async(req,res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalUser = await User.countDocuments();
        const userList = await User.find({}).skip(skip).limit(limit);
        res.status(200).json({
            success: true,
            data: userList,
            pagination: {
                totalUser,
                currentPage: page,
                totalPages: Math.ceil(totalUser/limit),
                pageSize: limit
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

const deleteUser = async(req, res) => {
    try {
        const userId = req.params.id;
        console.log("User ID to delete:", userId);  // Debug log

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error(error);  // Debug log
        res.status(500).json({
            success: false,
            message: "Some error occurred",
            error: error.message
        });
    }
};

const updateUserActiveStatus = async(req, res) => {
    const {isActive} = req.body;
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({
            success: false,
            message: 'User not found'
        })
        user.isActive = isActive
        await user.save();
        res.status(200).json({
            success: true,
            message: "User is banned",
            data: user
        })
    } catch (error) {
        res.status(500).json({ message: 'Error updating user status', error }); 
    }
}

module.exports = {getAllUser, createUser, deleteUser, updateUserActiveStatus}
