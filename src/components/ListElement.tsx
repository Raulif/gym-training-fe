import Image from "next/image";
import { useContext, useState } from "react";
import { DataContext } from "./DataProvider";

const ListElement = ({ training }: { training: any }) => {
  const {updateTraining} = useContext(DataContext)
  const [edit, setEdit] = useState(false);
  const [newWeight, setNewWeight] = useState(training.weight);

  const onInputChange = (e: any) => {
    setNewWeight(e.target.value);
  };
  const onConfirm = async () => {
    updateTraining && await updateTraining(training.id, newWeight)
    setEdit(false);
  };
  const onCancel = () => {
    setEdit(false);
    setNewWeight(training.weight)
  };

  return (
    <li key={training.id} className="flex flex-col">
      <div className="flex flex-row color-white items-center justify-between h-8">
        <p className="truncate">{training.name}</p>
        <div className="flex items-center">
          <div className="flex items-center">
            {edit ? (
              <input
                className="h-8 p-2 w-16 text-right text-lg ml-2"
                value={newWeight}
                onChange={onInputChange}
                autoFocus
                type="number"
              />
            ) : (
              <p className="text-xl">{training.weight}</p>
            )}
            <p className="ml-1">Kg.</p>
          </div>
          <div className="flex justify-end ml-2">
            {edit ? (
              <div className="flex">
                <button onClick={onCancel} className="w-10 flex justify-center">
                  <Image
                    src="/icon-close.svg"
                    width="22"
                    height="22"
                    alt="pencil icon"
                  />
                </button>
                <button onClick={onConfirm} className="w-10 flex justify-center">
                  <Image
                    src="/icon-check.svg"
                    width="22"
                    height="22"
                    alt="pencil icon"
                  />
                </button>
              </div>
            ) : (
              <button onClick={() => setEdit(true)}>
                <Image
                  src="/icon-pencil.svg"
                  width="22"
                  height="22"
                  alt="pencil icon"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
export default ListElement;
