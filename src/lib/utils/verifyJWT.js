import jwt from 'jsonwebtoken';

export const verifyJWT = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
