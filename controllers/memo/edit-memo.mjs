import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../config/firebase-app.mjs";

export const editMemo = async (req, res) => {
  try {
    const { memo_id } = req.params; 
    const { title, body } = req.body; 
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

    if (!title && !body) {
      return res.status(400).json({
        status: "error",
        message: "At least one field must be provided to update.",
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
        message: "Forbidden. You are not allowed to edit this memo.",
      });
    }

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (body) updatedFields.body = body;
    updatedFields.updatedAt = new Date().toISOString(); 

    await updateDoc(memoRef, updatedFields);

    return res.status(200).json({
      status: "success",
      message: "Memo updated successfully",
      data: {
        id: memo_id,
        ...updatedFields,
      },
    });
  } catch (error) {
    console.error("Error updating memo:", error);

    const errorCode = error.code || 500;
    const errorMessage = error.message || "Internal Server Error";

    return res.status(errorCode).json({
      status: "error",
      message: errorMessage,
    });
  }
};
