import jwt from "jsonwebtoken";

export const withAuth = (handler) => {
  return async (req) => {
    // Extracts the token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    // Check if the Authorization header is present and get the token
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized: No token provided' }),
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Adds the user to the request object
      req.user = { username: decoded.username, id: decoded.id };
      // Proceeds to the route handler
      return handler(req);
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ message: 'Unauthorized: Invalid token' }),
        { status: 401 }
      );
    }
  };
};
