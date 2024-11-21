import admin from "firebase-admin";

/**
 * Middleware to authenticate and decode Firebase token
 */

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Authorization token is required.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);

    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token.",
    });
  }
};
