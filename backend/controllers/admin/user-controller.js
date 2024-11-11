const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        const {password, ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occurred",
            error: error.message
        });
    }
}

const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.userId){
        return res.status(403).json({
            success: false,
            message: "You are not allowed to update this user",
        });
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }
        req.body.password = bcrypt.hashSync(req.body.password,12)
    }
    if(req.body.userName){
        if(req.body.userName.length < 7 || req.body.userName.length > 20){
            return res.status(400).json({
                success: false,
                message: "Username must be between 7 and 20 characters",
            });
        }
        if(req.body.userName.includes(' ')){
            return res.status(400).json({
                success: false,
                message: "Username cannot contain spaces",
            });
        }
        if(!req.body.userName.match(/^[a-zA-Z0-9]+$/)){
            return res.status(400).json({
                success: false,
                message: "Username can only contain letters and numbers",
            });
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,{
                $set: {
                    userName: req.body.userName,
                    email: req.body.email,
                    profilePircture: req.body.profilePicture,
                    password: req.body.password
                }
            },{new:true}
        )
        const token = jwt.sign({
            id: updatedUser._id,
            role: updatedUser.role,
            email: updatedUser.email,
            userName: updatedUser.userName,
            profilePircture: updatedUser.profilePircture
        }, "CLIENT_SECRET_KEY",{expiresIn: "60m"})
        res.cookie('token', token, {httpOnly: true, secure: false}).json({
            success: true,
            message: "Update Profile Successfully",
            user: {
                email: updatedUser.email,
                role: updatedUser.role,
                id: updatedUser._id,
                userName: updatedUser.userName,
                profilePircture: updatedUser.profilePircture
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
}
module.exports = {getUser, getAllUser, createUser, deleteUser, updateUserActiveStatus, updateUser}
