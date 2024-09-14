import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase.confi";

export const getUserData = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        const userDataCollection = userCred.providerData[0];
        const userData = {
          Fullname: userDataCollection.displayName,
          ...userDataCollection,
        };
        const unsubscribe = onSnapshot(
          doc(db, "users", userData?.uid),
          (_doc) => {
            if (_doc.exists()) {
              resolve(_doc.data());
            } else {
              setDoc(doc(db, "users", userData?.uid), userData).then(() => {
                resolve(userData);
              });
            }
          }
        );
        return unsubscribe;
      } else {
        reject(new Error("User is not authenticated"));
      }
      unsubscribe();
    });
  });
};
