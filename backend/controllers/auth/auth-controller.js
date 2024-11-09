const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const registerUser = async(req, res) => {
    const {userName, email, password} = req.body;
    try {
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.json({
                success: false,
                message: "User already exsist with the same email! please try again"
            })
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, email, password: hashPassword
        });
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registration successfull"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        const checkUser = await User.findOne({email});
        console.log(checkUser)
        if(!checkUser)
            return res.json({
                success: false,
                message: "User doesn't exists! Please register first"
            })
        if(!checkUser.isActive){
            return res.json({
                success: false,
                message: "User is banned"
            })
        }
        const checkPasswordMath = await bcrypt.compare(password, checkUser.password)
        if(!checkPasswordMath)
            return res.json({
                success: false,
                message: "Incorrect password! Please try again"
            })
        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.userName,
            profilePircture: checkUser.profilePircture
        }, "CLIENT_SECRET_KEY",{expiresIn: "60m"})
        res.cookie('token', token, {httpOnly: true, secure: false}).json({
            success: true,
            message: "Logged in successfully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName,
                profilePircture: checkUser.profilePircture
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "Logged out successfully"
    })
}

const google = async (req, res, next) => {
    const {email, userName, googlePhotoUrl} = req.body;
    console.log(email)
    try {
        const checkUser = await User.findOne({email});
        if(checkUser){
            const token = jwt.sign({
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                userName: checkUser.userName,
                profilePircture: checkUser.profilePircture
            }, "CLIENT_SECRET_KEY",{expiresIn: "60m"})
            console.log(token)
            res.cookie('token', token, {httpOnly: true}).json({
                success: true,
                message: "Logged in successfully",
                user: {
                    email: checkUser.email,
                    role: checkUser.role,
                    id: checkUser._id,
                    userName: checkUser.userName,
                    profilePircture: checkUser.profilePircture
                }
            })
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + 
                                      Math.random().toString(36).slice(-8);
            const hashPassword = bcrypt.hashSync(generatedPassword, 12);
            const newUser = new User({
                userName: userName.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashPassword,
                profilePircture: googlePhotoUrl
            });
            await newUser.save();
            const token = jwt.sign({
                id: newUser._id, 
                role: newUser.role,
                email: newUser.email,
                userName: newUser.userName,
                profilePircture: newUser.profilePircture
            }, "CLIENT_SECRET_KEY",{expiresIn: "60m"})
            console.log(token);
            res.status(200).cookie('token', token, {httpOnly: true}).json({
                success: true,
                message: "Logged in successfully",
                user: {
                    email: newUser.email,
                    role: newUser.role,
                    id: newUser._id,
                    userName: newUser.userName,
                    profilePircture: newUser.profilePircture
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

const authMiddleware = async(req, res, next) => {
    const token = req.cookies.token;
    if(!token)
        return res.status(401).json({
            success: false,
            message: "Unauthorized user!"
        })
    try {
        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized user"
        })
    }
}

module.exports = {registerUser, loginUser, authMiddleware, logoutUser, google}