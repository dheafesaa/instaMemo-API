import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCaCieh2J7pQWxNu7zSkPBX-tWSu868Fe4",
  authDomain: "instamemo-55140.firebaseapp.com",
  projectId: "instamemo-55140",
  storageBucket: "instamemo-55140.firebasestorage.app",
  messagingSenderId: "933546212819",
  appId: "1:933546212819:web:f4ee57b913f62db8700326",
  measurementId: "G-FTEYJCJ3C1",
};

const fireInit = initializeApp(firebaseConfig);
const db = getFirestore(fireInit);

export const getUserLoggedIn = async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user.uid) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized. No user found.",
      });
    }

    const usersCollection = collection(db, "users");
    const userQuery = query(
      usersCollection,
      where("firebaseUid", "==", user.uid),
    );
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      return res.status(404).json({
        status: "error",
        message: "User not found in database.",
      });
    }

    const userData = querySnapshot.docs[0].data();

    return res.status(200).json({
      status: "success",
      message: "User retrieved",
      data: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      },
    });
  } catch (error) {
    console.error("Error fetching logged-in user:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
