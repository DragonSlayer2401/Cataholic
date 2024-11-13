import dbConnect from '@/lib/db';
import User from '@/models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

// Finds a user by ID
export const findUserById = async (userId) => {
  await dbConnect();

  try {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return null;
    }

    return foundUser;
  } catch (error) {
    console.error(`Error finding user by ID: ${error.message}`);
  }
};

// Finds a user by username
export const findUserByEmail = async (email) => {
  await dbConnect();

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return null;
    }

    return foundUser;
  } catch (error) {
    console.error(`Error finding user by email: ${error.message}`);
  }
};

// Creates a new user
export const createUser = async (userObj) => {
  await dbConnect();

  try {
    const newUser = new User(userObj);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
  }
};

// Updates username or password
export const updateUser = async (userId, updateObj) => {
  await dbConnect();

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateObj },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return null;
    }

    return updatedUser;
  } catch (error) {
    console.error(`Error updating user: ${error.message}`);
  }
};

// Deletes a user
export const deleteUser = async (userId) => {
  await dbConnect();

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return null;
    }

    return deletedUser;
  } catch (error) {
    console.error(`Error deleting user: ${error.message}`);
  }
};

// Adds favorited images to a user
export const updateFavorites = async (userId, favorites) => {
  await dbConnect();

  try {
    const updatedFavorites = await User.findByIdAndUpdate(
      userId,
      { $set: { favorites: favorites } },
      { new: true, runValidators: true }
    );

    if (!updatedFavorites) {
      return null;
    }

    return updatedFavorites;
  } catch (error) {
    console.error(`Error updating favorites: ${error.message}`);
  }
};

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error(`Error hashing password: ${error.message}`);
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    const success = await bcrypt.compare(password, hashedPassword);
    return success;
  } catch (error) {
    console.error(`Error verifying password: ${error.message}`);
  }
};

export const generateJWT = (user, time) => {
  try {
    const signedJWT = jwt.sign(
      {
        data: { id: user.id, email: user.email },
      },
      process.env.JWT_SECRET,
      { expiresIn: time || '7d' }
    );

    return signedJWT;
  } catch (error) {
    console.error(`Error generating JWT: ${error.message}`);
  }
};

export const sendResetEmail = async (email, resetLink) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Cataholic" <jacobskip7@gmail.com>',
      to: email,
      subject: 'Cataholic Password Reset Request 🐈',
      text: `Hello Cat Lover,\n\nIt seems you've requested to reset your password for your Cataholic account. No worries, we've got you covered! Please click the link below to reset your password:\n\n${resetLink}\n\nIf you didn't request a password reset, you can safely ignore this email-no paws were harmed. However, if you believe someone might be trying to access your account without your purr-mission, we recommend changing your password immediately.\n\nThis link will expire in 5 minutes for your security.\n\nStay pawsome,\nThe Cataholic Team 🐱`,
      html: `<p>Hello Cat Lover,</p><p>It seems you've requested to reset your password for your Cataholic account. No worries, we've got you covered! Please click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p><p>If you didn't request a password reset, you can safely ignore this email-no paws were harmed. However, if you believe someone might be trying to access your account without your purr-mission, we recommend changing your password immediately.</p><p>This link will expire in 5 minutes for your security.</p><p>Stay pawsome,<br>The Cataholic Team 🐱</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error(`Error sending reset email: ${error.message}`);
  }
};
