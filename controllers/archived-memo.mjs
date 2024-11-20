import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
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

export const allArchivedMemo = async (req, res) => {
  try {
    const archivedMemoCollection = collection(db, "memo");
    const q = query(archivedMemoCollection, where("archived", "==", true));

    const querySnapshot = await getDocs(q);

    const archivedMemoList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      body: doc.data().body,
      createdAt: doc.data().createdAt,
      archived: doc.data().archived,
      owner: doc.data().owner,
    }));

    if (archivedMemoList.length === 0) {
      return res.status(404).json({
        status: "success",
        message: "No archived memo found.",
        data: [],
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Memo retrieved",
      data: archivedMemoList,
    });
  } catch (error) {
    const errorCode = error.code || 500;
    const errorMessage = error.message || "Internal Server Error";
    return res.status(errorCode).json({
      error: {
        code: errorCode,
        message: errorMessage,
      },
    });
  }
};
