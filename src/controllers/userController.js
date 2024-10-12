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
    console.error(error);
    throw new Error('Error finding user by ID');
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
    console.error(error);
    throw new Error('Error finding user by username');
  }
};

// Creates a new user
export const createUser = async (userObj) => {
  await dbConnect();

  try {
    const newUser = new User(userObj);
    await newUser.save();
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user');
  }

  return newUser;
};

// Updates username or password
export const updateUser = async (userId, updateObj) => {
  await dbConnect();
};

// Deletes a user
export const deleteUser = async (userId) => {
  await dbConnect();
};

// Adds favorited images to a user
export const updateFavorites = async (userId, favoriteObj) => {
    await dbConnect();
};
