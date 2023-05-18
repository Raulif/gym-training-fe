"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import useFirebase from "@/hooks/useFirebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

type Props = {
  trainings: Array<any>;
  updateAllSets: (training: any, amount: number) => void;
  dayOneTrainings: Array<any>;
  dayTwoTrainings: Array<any>;
  updateBasicInfo: (training: any, newInfo: any) => void;
};

const TRAININGS_COLLECTION = "trainings";

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [trainings, setTrainings] = useState<Array<any>>([]);
  const [dayOneTrainings, setDayOneTrainings] = useState<Array<any>>([]);
  const [dayTwoTrainings, setDayTwoTrainings] = useState<Array<any>>([]);

  const firebase = useFirebase();

  const updateAllSets = async (training: any, amount: number) => {
    if (!firebase?.db) return;
    const trainingRef = doc(firebase.db, TRAININGS_COLLECTION, training.id);
    await setDoc(trainingRef, { weight: amount }, { merge: true });
    await fetchData();
  };

  const updateBasicInfo = async (training: any, newInfo: any) => {
    if (!firebase?.db) return;
    const trainingRef = doc(firebase.db, TRAININGS_COLLECTION, training.id);
    await setDoc(trainingRef, newInfo, { merge: true });
    await fetchData();
  }

  const updateTrainingSet = async () => {}

  const fetchData = useCallback(async () => {
    if (firebase?.db) {
      const querySnapshot = await getDocs(
        collection(firebase.db, TRAININGS_COLLECTION)
      );
      let tr: Array<any> = [];
      querySnapshot.forEach((doc) => {
        tr.push({ id: doc.id, ...doc.data() });
      });
      const dayOne = tr
        .filter((training) => training.day === 1)
        .sort((trA, trB) => trA.order - trB.order);
      const dayTwo = tr
        .filter((training) => training.day === 2)
        .sort((trA, trB) => trA.order - trB.order);
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
        updateAllSets,
        dayOneTrainings,
        dayTwoTrainings,
        updateBasicInfo
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const DataContext = createContext<Partial<Props>>({
  dayOneTrainings: [],
  dayTwoTrainings: [],
  trainings: [],
  updateAllSets: () => {},
});

export default DataProvider;
