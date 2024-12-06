import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { db } from "../../config/firebase-app.mjs";

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
        id: userData.firebaseUid,
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
