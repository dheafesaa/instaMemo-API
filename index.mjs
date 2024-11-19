import express, { json } from 'express';
import { allActiveMemo } from './controllers/active-memo.mjs';
import { initializeFirebaseAdmin } from './config/firebase-admin.mjs';

const app = express();
app.use(json());

// Initialize Firebase Admin SDK
initializeFirebaseAdmin();

// Define routes
app.get('/active-memo', allActiveMemo);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
