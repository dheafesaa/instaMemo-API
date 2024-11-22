import {
  firebaseAdmin,
  initializeFirebaseAdmin,
} from "../config/firebase-admin.mjs";

initializeFirebaseAdmin();

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
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message || error);

    let message = "Invalid or expired token.";
    if (error.code === "auth/argument-error") {
      message = "Invalid token format.";
    }

    return res.status(401).json({
      status: "error",
      message,
    });
  }
};
