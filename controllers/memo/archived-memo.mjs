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

    if (!req.params || Object.keys(req.params).length === 0) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad Request. Missing or invalid parameters.",
      });
    }

    const archivedMemoCollection = collection(db, "memo");
    const q = query(
      archivedMemoCollection,
      where("archived", "==", true),
      where("owner", "==", user.uid),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);

    const archivedMemoList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      status: "success",
      message:
        archivedMemoList.length > 0
          ? "Memos retrieved"
          : "No archived memos found.",
      data: archivedMemoList,
    });
  } catch (error) {
    console.error("Error retrieving active memos:", error);

    if (error.code === "permission-denied") {
      return res.status(403).json({
        status: "error",
        code: 403,
        message: "Forbidden. You do not have permission to access this resource.",
      });
    }

    const errorCode = error.code || 500;
    const errorMessage = error.message || "Internal Server Error";

    return res.status(errorCode).json({
      status: "error",
      code: errorCode,
      message: errorMessage,
    });
  }
};
