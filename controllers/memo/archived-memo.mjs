import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../../config/firebase-app.mjs";

export const allArchivedMemo = async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user.uid) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized. Please log in.",
      });
    }

    const archivedMemoCollection = collection(db, "memo");
    const q = query(
      archivedMemoCollection,
      where("archived", "==", true),
      where("owner", "==", user.uid),
    );

    const querySnapshot = await getDocs(q);

    const archivedMemoList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      status: "success",
      code: 200,
      message:
        archivedMemoList.length > 0
          ? "Memos retrieved successfully."
          : "No archived memos found.",
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
