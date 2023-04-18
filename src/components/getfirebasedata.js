import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useFetchCollection = (dbcollection) => {
  const [fbdbdata, setDbdata] = useState(null);

  useEffect(() => {
    let collectionRef = collection(db, dbcollection);
    const unsub = onSnapshot(collectionRef, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((docs) => {
        results.push({
          ...docs.data(),
          id: docs.id,
        });
        setDbdata(results);
      });
    });
    return () => unsub();
  }, [dbcollection]);

  return { fbdbdata }
};

