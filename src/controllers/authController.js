import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userData.js';
import dotenv from 'dotenv';
dotenv.config();

const SALT_ROUNDS = 10;

export const signup = async (username, email, password, role = 'user') => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({ username, email, password: hashedPassword, role });
    
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { user: user.toJSON(), token };
};

export const login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { user: user.toJSON(), token };
};
