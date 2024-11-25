import express, { json } from "express";
import { initializeFirebaseAdmin } from "./config/firebase-admin.mjs";
import { allActiveMemo } from "./controllers/memo/active-memo.mjs";
import { allArchivedMemo } from "./controllers/memo/archived-memo.mjs";
import { addMemo } from "./controllers/memo/add-memo.mjs";
import { getMemoDetail } from "./controllers/memo/detail-memo.mjs";
import { deleteMemo } from "./controllers/memo/delete-memo.mjs";
import { register } from "./controllers/authentication/register-memo.mjs";
import { login } from "./controllers/authentication/login-memo.mjs";
import { authMiddleware } from "./middleware/auth-middleware.mjs";
import { getUserLoggedIn } from "./controllers/authentication/user-loggedin-memo.mjs";
import { editMemo } from "./controllers/memo/edit-memo.mjs";
import { archiveMemo } from "./controllers/memo/archive-memo.mjs";
import { unarchiveMemo } from "./controllers/memo/unarchive-memo.mjs";

const app = express();
app.use(json());

// Initialize Firebase Admin SDK
initializeFirebaseAdmin();

// Define routes for authentication 
app.post("/register", register)
app.post("/login", login)
app.get("/users/me", authMiddleware, getUserLoggedIn);

// Define routes for memo 
app.get("/memo/active-memo", authMiddleware, allActiveMemo);
app.get("/memo/archived-memo", authMiddleware, allArchivedMemo);
app.post("/memo/add-memo", authMiddleware, addMemo);
app.get("/memo/:memo_id", authMiddleware, getMemoDetail);
app.delete("/memo/:memo_id", authMiddleware, deleteMemo);
app.patch("/memo/:memo_id", authMiddleware, editMemo)
app.patch("/memo/:memo_id/archive", authMiddleware, archiveMemo);
app.patch("/memo/:memo_id/unarchive", authMiddleware, unarchiveMemo);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
