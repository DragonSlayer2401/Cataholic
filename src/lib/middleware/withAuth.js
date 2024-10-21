import jwt from "jsonwebtoken";

export const withAuth = (handler) => {
  return async (req) => {
    // Extracts all cookies from cookie header
    const cookieHeader = req.headers.get('cookie');
    // Extracts token from cookies
    const token = cookieHeader?.split('; ').find((cookie) => cookie.startsWith('token='))?.split('=')[1];

    if (!token) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized: No token provided' }),
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Adds the user to the request object
      req.user = { email: decoded.data.email, id: decoded.data.id };
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
