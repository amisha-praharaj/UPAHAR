import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing Details" });
        }
        const existingUser = await User.findOne({ email })

        if (existingUser)
            return res.status(400).json({ message: "User already exists" })

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie('token', token, {
            httpOnly: true,  //prevent js to access cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // prevent csrf attack
            maxAge: 7 * 24 * 60 * 60 * 1000, //cookie exparation time
        })

        return res.json({ success: true, user: { email: user.email, name: user.name } })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });

    }
}




//login user : /api/user/login
export const login = async (req, res) => {

    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Missing Details" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "invalid credentials" });

        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie('token', token, {
            httpOnly: true,  //prevent js to access cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // prevent csrf attack
            maxAge: 7 * 24 * 60 * 60 * 1000, //cookie exparation time
        })

        return res.json({ success: true, user: { email: user.email, name: user.name } })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}


//check the user is unthenticated or not : api/user/isauth
export const isauth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        return res.json({ success: true, user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

//logout user : /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,  //prevent js to access cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // prevent csrf attack
        });
        return res.json({ success: true, message: "Logout Successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });

    }
}