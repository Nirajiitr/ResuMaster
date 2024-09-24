import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase.confi";
import axios from "axios";


export const getUserData = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async (userCred) => {
      if (userCred) {
        const userDataCollection = userCred.providerData[0];
        const userData = {
          Fullname: userDataCollection.displayName,
          ...userDataCollection,
        };
        const unsubscribeFirebase = onSnapshot(
          doc(db, "users", userData?.uid),
          (_doc) => {
            if (_doc.exists()) {
              resolve(_doc.data());
            } else {
              setDoc(doc(db, "users", userData?.uid), userData).then(() => {
                resolve(userData);
              });
            }
          },
          (error) => {
            reject(new Error("Failed to fetch data from Firestore: " + error.message));
          }
        );

        return unsubscribeFirebase;
      } else {
        try {
          const Token = localStorage.getItem("Token")
            ? JSON.parse(localStorage.getItem("Token"))
            : null;

          if (!Token) {
            reject(new Error("Token error "));
            return;
          }

          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/user`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
              withCredentials: true,
            }
          );

          if (res.status === 200) {
            resolve({ ...res.data.user});
          } else {
            reject(new Error("Failed to authenticate user from backend"));
          }
        } catch (error) {
          reject(new Error("User is not authenticated: " + error.message));
        }
      }

      unsubscribe(); 
    });
  });
};
