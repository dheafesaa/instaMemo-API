# 📒 InstaMemo API

## 🌟 Overview
InstaMemo API is a backend service built for the **InstaMemo** application—a note-taking app designed to simplify organizing your thoughts and ideas. 📝 Powered by **Node.js**, **Express**, and **Firebase**, this API provides robust features such as secure user authentication and notes management.

## ✨ Features
- 🔒 **User Authentication**: Secure sign-up, login, and token-based authentication.
- 🗂️ **Notes Management**: Create, read, update, and delete (CRUD) notes effortlessly.
- 🔑 **Secure Password Handling**: Passwords are hashed using `argon2` for top-notch security.

---

## 🚀 Getting Started

### ✅ Prerequisites
Before running this project, make sure you have:
- **Node.js** (v16 or later) 🌳
- **npm** (Node Package Manager) 📦

### 🛠️ Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/dheafesaa/instaMemo-API.git
   cd instaMemo-API
2. **Install dependencies**:
   ```bash
   npm install
3. **Set up Firebase**:
- Go to the Firebase Console.
- Create a new project or use an existing one.
- Add a web app to your Firebase project and copy the configuration.
- Configure `firebase-app.mjs` with your Firebase credentials.
4. **Set Environment Variables**:
Create a .env file in the root directory and add the following environment variables:
   ```bash
   FIREBASE_API_KEY=your-firebase-api-key
   FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   FIREBASE_PROJECT_ID=your-firebase-project-id

### ▶️ Running the Server
1. **Start Development Server**
Run the application in development mode:
   ```bash
   npm run dev
2. **Production Deployment**
Deploy the application to Vercel for production:
   ```bash
   vercel --prod

### 🛠️ Technologies Used
- 🌳 Node.js: Server-side runtime for building scalable applications.
- ⚡ Express.js: Lightweight and fast web framework.
- 🔥 Firebase: Authentication and Firestore for real-time data.
- 🔑 Argon2: Secure password hashing for user authentication.
