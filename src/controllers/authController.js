const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if ( existingUser ) {
            return res.status(400).json({message: 'Имэйл аль хэдийн бүртгэлтэй байна'});
        }

        const user = await User.create({ username, email, password });

        const token = generateToken(user._id);

        res.status(201).json({
            message: 'Бүртгэл амжилттай',
            token, 
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }); 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Имэйл эсвэл нууц үг буруу' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res
              .status(401)
              .json({ message: "Имэйл эсвэл нууц үг буруу" });
        }

        const token = generateToken(user._id);
        
        res.status(200).json({
            message: 'Нэвтрэлт амжилттай',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { username, email } = req.body;

        if(email) {
            const existingUser = await User.findOne({
                email,
                _id: { $ne: req.user._id }
            });
            if (existingUser) {
                return res.status(400).json({message: 'Имэйл аль хэдийн бүртгэлтэй байна'})
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { username, email },
            { new: true, runValidators: true }
        ).select('-password');

        res.status(200).json({
            message: 'Мэдээлэл амжилттай шинэчлэгдлээ',
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.status(200).json({message: 'Хэрэглэгч амжилттай устгагдлаа'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {register, login, deleteUser, updateUser};