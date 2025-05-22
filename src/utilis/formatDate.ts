import moment from "moment";
import { Timestamp, FieldValue } from "firebase/firestore"; // modular import

export const formatDate = (timestamp: Date | Timestamp | FieldValue | null | undefined): string => {
  if (!timestamp) return "N/A";

  // console.log("Timestamp type:", typeof timestamp, timestamp, timestamp instanceof Timestamp);
  if (timestamp instanceof Timestamp) {
    return moment(timestamp.toDate()).format("MMMM Do YYYY, h:mm:ss A");
  } else if (timestamp instanceof Date) {
    return moment(timestamp).format("MMMM Do YYYY, h:mm:ss A");
  } else {
    return "Saving..."; // <-- It's still a FieldValue (pending serverTimestamp)
  }
};
