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
          }
        );
        return unsubscribeFirebase;

      } else {
        
        try {
          const res = await axios.get("https://resumaster-backind.onrender.com/auth/user", {
            withCredentials: true,
          });

          if (res.status === 200) {
            resolve({...res.data.user}); 
          } else {
            reject(new Error("User is not authenticated "));
          }
        } catch (error) {
          reject(new Error("User is not authenticated"));
        }
      }
      unsubscribe(); 
    });
  });
};
