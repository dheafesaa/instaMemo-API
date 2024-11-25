import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../../config/firebase-app.mjs";

export const getMemoDetail = async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user.uid) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized. Please log in.",
      });
    }

    const { memo_id } = req.params;

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
        message: "Forbidden. You do not have access to this memo.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Memo retrieved",
      data: {
        id: memoSnapshot.id,
        ...memoData,
      },
    });
  } catch (error) {
    console.error("Error fetching memo details:", error);

    const errorCode = error.code || 500;
    const errorMessage = error.message || "Internal Server Error";
    return res.status(errorCode).json({
      status: "error",
      message: "Failed to retrieve memo",
      error: {
        code: errorCode,
        message: errorMessage,
      },
    });
  }
};
