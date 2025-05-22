import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
// import useLocalStorage from "../hooks/useLocalStorage";

const tasksRef = collection(db, "tasks");


export const getTasks = async (userId: string) => {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log("Fetched tasks:", tasks);
  return tasks;
};

export const addTask = async (task: any) => await addDoc(tasksRef, task);
export const updateTask = async (id: string, updates: any) => {
  const taskDoc = doc(db, "tasks", id);
  return updateDoc(taskDoc, updates);
};
export const deleteTask = async (id: string) => {
  const taskDoc = doc(db, "tasks", id);
  return deleteDoc(taskDoc);
};
