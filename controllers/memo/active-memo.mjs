import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../../config/firebase-app.mjs";

export const allActiveMemo = async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user.uid) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized. Please log in.",
      });
    }

    const activeMemoCollection = collection(db, "memo");
    const q = query(
      activeMemoCollection,
      where("archived", "==", false),
      where("owner", "==", user.uid),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);

    const activeMemoList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      status: "success",
      message:
        activeMemoList.length > 0
          ? "Memos retrieved"
          : "No active memos found.",
      data: activeMemoList,
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
