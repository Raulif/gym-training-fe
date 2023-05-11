"use client";
import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import useFirebase from "@/hooks/useFirebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { get } from "http";

type Props = {
  trainings: Array<any>;
  updateTraining: (id: string, weight: number) => void;
  dayOneTrainings: Array<any>;
  dayTwoTrainings: Array<any>;
};

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [trainings, setTrainings] = useState<Array<any>>([]);
  const [dayOneTrainings, setDayOneTrainings] = useState<Array<any>>([]);
  const [dayTwoTrainings, setDayTwoTrainings] = useState<Array<any>>([]);

  const firebase = useFirebase();

  const updateTraining = async (id: string, weight: number) => {
    if (!firebase?.db) return;
    const trainingRef = doc(firebase.db, "trainings", id);
    await setDoc(trainingRef, { weight: weight }, { merge: true });
    await fetchData();
  };

  const fetchData = useCallback(async () => {
    if (firebase?.db) {
      const querySnapshot = await getDocs(
        collection(firebase.db, "trainings")
      );
      let tr: Array<any> = [];
      querySnapshot.forEach((doc) => {
        tr.push({ id: doc.id, ...doc.data() });
      });
      const dayOne = tr.filter((training) => training.day === 1).sort((trA, trB) => trA.order - trB.order);
      const dayTwo = tr.filter((training) => training.day === 2).sort((trA, trB) => trA.order - trB.order);
      setTrainings(tr);
      setDayOneTrainings(dayOne);
      setDayTwoTrainings(dayTwo);
    }
  }, [firebase]);

  useEffect(() => {
    if (!trainings.length) {
      fetchData();
    }
  }, [firebase, trainings, fetchData]);

  return (
    <DataContext.Provider
      value={{
        trainings,
        updateTraining,
        dayOneTrainings,
        dayTwoTrainings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const DataContext = createContext<Partial<Props>>({ trainings: [] });

export default DataProvider;
