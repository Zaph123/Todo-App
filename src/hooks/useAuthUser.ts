import { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

export const useAuthUser = () => {
  const [user, setUser] = useState<{ uid: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser({ uid: firebaseUser.uid });
      } else {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error("Anonymous sign-in failed:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};
