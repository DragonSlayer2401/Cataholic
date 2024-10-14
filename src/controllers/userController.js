import dbConnect from '@/lib/db';
import User from '@/models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
    throw new Error(`Error finding user by ID: ${error.message}`);
  }
};

// Finds a user by username
export const findUserByUsername = async (username) => {
  await dbConnect();

  try {
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return null;
    }

    return foundUser;
  } catch (error) {
    throw new Error(`Error finding user by username: ${error.message}`);
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
    throw new Error(`Error creating user: ${error.message}`);
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
    throw new Error(`Error updating user: ${error.message}`);
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
    throw new Error(`Error deleting user: ${error.message}`);
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
    throw new Error(`Error updating favorites: ${error.message}`);
  }
};

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    const success = await bcrypt.compare(password, hashedPassword);
    return success;
  } catch (error) {
    throw new Error(`Error verifying password: ${error.message}`);
  }
};

export const generateJWT = (user) => {
  try {
    const signedJWT = jwt.sign(
      {
        data: { id: user.id, username: user.username },
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return signedJWT;
  } catch (error) {
    throw new Error(`Error generating JWT: ${error.message}`);
  }
};
