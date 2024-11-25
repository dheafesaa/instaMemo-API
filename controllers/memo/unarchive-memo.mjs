import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../config/firebase-app.mjs";

export const unarchiveMemo = async (req, res) => {
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
        message: "Forbidden. You are not allowed to unarchive this memo.",
      });
    }

    await updateDoc(memoRef, { archived: false });

    return res.status(200).json({
      status: "success",
      message: "Memo unarchived successfully",
      data: {
        id: memo_id,
        archived: false,
      },
    });
  } catch (error) {
    console.error("Error unarchiving memo:", error);

    const errorCode = error.code || 500;
    const errorMessage = error.message || "Internal Server Error";

    return res.status(errorCode).json({
      status: "error",
      message: errorMessage,
    });
  }
};
