import dbConnect from '@/lib/db';
import User from '@/models/user';
import Favorite from '@/models/favorite';
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
    const deletedFavorites = await Favorite.deleteMany({ userId });
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser || !deletedFavorites) {
      return null;
    }

    return {deletedUser, deletedFavorites};
  } catch (error) {
    console.error(`Error deleting user: ${error.message}`);
  }
};

// Finds one favorited image
export const findFavorite = async (userId, id) => {
  await dbConnect();

  try {
    const favorite = await Favorite.findOne({ userId, id });

    if (!favorite) {
      return null;
    }

    return favorite;
  } catch (error) {
    console.error(`Error finding single favorite ${error.message}`);
  }
};

// Finds a user's favorited images
export const findFavorites = async (userId, limit, lastCreatedAt) => {
  await dbConnect();

  try {
    const query = { userId };

    if (lastCreatedAt) {
      query.createdAt = { $gt: new Date(lastCreatedAt) }; // Gets results with creation dates greater than the last fetched item
    }

    const favorites = await Favorite.find(query)
      .sort({ createdAt: 1 }) // Sort in ascending order
      .limit(parseInt(limit)) // Returns specified number of results
      .lean(); // Returns JavaScript objects instead of Mongoose documents

    return favorites || [];
  } catch (error) {
    console.error(`Error finding favorites: ${error.message}`);
  }
};

// Adds a favorited images to a user
export const addFavorites = async (userId, updateObj) => {
  await dbConnect();

  try {
    const existingFavorite = await Favorite.findOne({
      userId,
      id: updateObj.id,
    });

    if (existingFavorite) {
      return null;
    }

    const newFavorite = new Favorite({
      userId,
      id: updateObj.id,
      alt: updateObj.alt,
      src: updateObj.src,
    });

    const createdFavorite = await newFavorite.save();

    return createdFavorite;
  } catch (error) {
    console.error(`Error adding favorites: ${error.message}`);
  }
};

// Delete a favorited image from a user
export const deleteFavorites = async (userId, id) => {
  await dbConnect();

  try {
    const deletedFavorite = await Favorite.findOneAndDelete({ userId, id });

    if (!deletedFavorite) {
      return null;
    }

    return deletedFavorite;
  } catch (error) {
    console.error(`Error deleting favorites: ${error.message}`);
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
