import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc } from "firebase/firestore/lite";

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

export const deleteMemo = async (req, res) => {
  try {
    const { memo_id } = req.params;
    const user = req.user;

    if (!user || !user.uid) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized. Please log in.",
      });
    }

    if (!memo_id) {
      return res.status(400).json({
        status: "error",
        message: "Memo ID is required",
      });
    }

    const memoRef = doc(db, "memo", memo_id);
    const memoSnapshot = await getDoc(memoRef);

    if (!memoSnapshot.exists()) {
      return res.status(404).json({
        status: "error",
        message: "Memo not found",
      });
    }

    const memoData = memoSnapshot.data();

    if (memoData.owner !== user.uid) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden. You are not allowed to delete this memo.",
      });
    }

    await deleteDoc(memoRef);

    return res.status(200).json({
      status: "success",
      message: "Memo deleted",
    });
  } catch (error) {
    console.error("Error deleting memo:", error);

    const errorCode = error.code || 500;
    const errorMessage = error.message || "Internal Server Error";
    return res.status(errorCode).json({
      status: "error",
      message: errorMessage,
    });
  }
};
