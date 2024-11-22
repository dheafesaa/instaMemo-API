import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";

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

export const addMemo = async (req, res) => {
  try {
    const { title, body } = req.body;
    const user = req.user;

    if (!user || !user.uid) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized. Please log in.",
      });
    }

    if (!title || !body) {
      return res.status(400).json({
        status: "error",
        message: "Title and body are required fields.",
      });
    }

    const newMemo = {
      title,
      body,
      owner: user.uid,
      archived: false,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "memo"), newMemo);

    return res.status(201).json({
      status: "success",
      message: "Memo added successfully",
      data: {
        id: docRef.id,
        ...newMemo,
      },
    });
  } catch (error) {
    console.error("Error adding memo:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
