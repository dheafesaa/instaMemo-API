import express, { json } from "express";
import { initializeFirebaseAdmin } from "./config/firebase-admin.mjs";
import { allActiveMemo } from "./controllers/active-memo.mjs";
import { allArchivedMemo } from "./controllers/archived-memo.mjs";
import { addMemo } from "./controllers/add-memo.mjs";
import { getMemoDetail } from "./controllers/detail-memo.mjs";
import { deleteMemo } from "./controllers/delete-memo.mjs";
import { register } from "./controllers/authentication/register-memo.mjs";
import { login } from "./controllers/authentication/login-memo.mjs";
import { authMiddleware } from "./middleware/auth-middleware.mjs";
import { getUserLoggedIn } from "./controllers/authentication/user-loggedin-memo.mjs";

const app = express();
app.use(json());

// Initialize Firebase Admin SDK
initializeFirebaseAdmin();

// Define routes for authentication 
app.post("/register", register)
app.post("/login", login)
app.get("/users/me", authMiddleware, getUserLoggedIn);

// Define routes for memo 
app.get("/memo/active-memo", allActiveMemo);
app.get("/memo/archived-memo", allArchivedMemo);
app.post("/memo/add-memo", addMemo);
app.get("/memo/:memo_id", getMemoDetail);
app.delete("/memo/:memo_id", deleteMemo);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
