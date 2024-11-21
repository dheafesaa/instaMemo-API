import express, { json } from "express";
import { initializeFirebaseAdmin } from "./config/firebase-admin.mjs";
import { allActiveMemo } from "./controllers/active-memo.mjs";
import { allArchivedMemo } from "./controllers/archived-memo.mjs";
import { addMemo } from "./controllers/add-memo.mjs";
import { deleteMemo } from "./controllers/delete-memo.mjs";

const app = express();
app.use(json());

// Initialize Firebase Admin SDK
initializeFirebaseAdmin();

// Define routes
app.get("/memo/active-memo", allActiveMemo);
app.get("/memo/archived-memo", allArchivedMemo);
app.post("/memo/add-memo", addMemo);
app.delete("/memo/:memo_id", deleteMemo);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
