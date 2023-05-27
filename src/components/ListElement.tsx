import Image from "next/image";
import { useCallback, useContext, useState } from "react";
import { DataContext } from "./DataProvider";
import TrainingSet from "./TrainingSet";
import EditableName from "./TrainingName";

const getTrainingType = (type: string) =>
  type === "weight" ? "Gewicht" : type === "endurance" ? "Ausdauer" : null;

const ListElement = ({ training }: { training: any }) => {
  const { updateAllSets, updateBasicInfo } = useContext(DataContext);
  const [editMain, setEditMain] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [newWeight, setNewWeight] = useState(training?.sets?.[0]?.weight);
  const [newSets, setNewSets] = useState<Array<any>>([]);
  const [newSet, setNewSet] = useState<any>({});
  const [createNewSet, setCreateNewSet] = useState(false);
  const [newName, setNewName] = useState(training.name);
  const [newType, setNewType] = useState(training.type);
  
  const isWeight = newType !== "endurance";
  const isEndurance = newType === "endurance";

  const onInputChange = (e: any) => {
    setNewWeight(e.target.value);
  };

  const onConfirm = async () => {
    console.log({editMain, isWeight, isEndurance})
    if (editMain && isWeight) {
      updateAllSets && (await updateAllSets(training, newWeight));
    }
    if (editDetails) {
      const basicInfo = {
        name: newName,
        type: newType,
      }
      updateBasicInfo && (await updateBasicInfo(training, basicInfo));
    }
    setEditMain(false);
    setEditDetails(false);
  };

  const onCancel = () => {
    setEditMain(false);
    setEditDetails(false);
    setNewWeight(training.weight);
    setNewName(training.name);
  };

  const onTypeChange = (event: any) => {
    setNewType(event.target.value);
  };

  const onEditClick = useCallback(() => {
    if (showDetails) {
      setEditDetails(!editDetails);
    } else {
      setEditMain(true);
    }
  }, [showDetails, editDetails]);

  const onNameChange = (name: string) => {
    setNewName(name);
  };

  const onValueChange =(value: number, field: string, index: number) => {
    const newSets = [...training?.sets];
    newSets[index][field] = value;
    setNewSets(newSets);
  }

  const mainAmount = isWeight
    ? training?.sets?.[0]?.weight
    : isEndurance
    ? training?.sets?.reduce((acc: number, set: any) => acc + set.time, 0)
    : training.weight;

  return (
    <li
      key={training.id}
      className={`flex flex-col ${
        showDetails ? "border-b border-white pb-2" : ""
      }`}
    >
      <div className="flex flex-row color-white items-center justify-between h-8">
        <EditableName
          onClick={() => setShowDetails(!showDetails)}
          name={newName}
          editing={editDetails}
          onChange={onNameChange}
        />
        <div className="flex items-center">
          <div className="flex items-center">
            {editMain ? (
              <input
                className="h-8 p-2 w-16 text-right text-lg ml-2"
                value={newWeight}
                onChange={onInputChange}
                autoFocus
                type="number"
              />
            ) : !showDetails ? (
              <p className="text-xl">{mainAmount}</p>
            ) : null}
            {!showDetails && (
              <p className="ml-1">
                {isWeight ? "Kg." : isEndurance ? "Min." : null}
              </p>
            )}
          </div>
          <div className="flex justify-end ml-2">
            {editMain || editDetails ? (
              <div className="flex">
                <button onClick={onCancel} className="w-10 flex justify-center">
                  <Image
                    src="/icon-close.svg"
                    width="22"
                    height="22"
                    alt="pencil icon"
                  />
                </button>
                <button
                  onClick={onConfirm}
                  className="w-10 flex justify-center"
                >
                  <Image
                    src="/icon-check.svg"
                    width="22"
                    height="22"
                    alt="pencil icon"
                  />
                </button>
              </div>
            ) : true ? (
              <button onClick={onEditClick}>
                <Image
                  src="/icon-pencil.svg"
                  width="22"
                  height="22"
                  alt="pencil icon"
                />
              </button>
            ) : (
              <div className="w-10" />
            )}
          </div>
        </div>
      </div>
      {showDetails ? (
        <div className="flex items-center text-base mb-2 mt-6 gap-x-3">
          <p className="text-sm">Type:</p>
          {!editDetails ? (
            <p>{getTrainingType(training.type)}</p>
          ) : (
            <select
              onChange={onTypeChange}
              className="bg-black text-base self-start"
            >
              <option value="endurance" selected={newType === "endurance"}>
                Ausdauer
              </option>
              <option value="weight" selected={newType === "weight"}>
                Gewicht
              </option>
            </select>
          )}
        </div>
      ) : null}
      {showDetails && training.sets?.length && (
        <div className="flex flex-col gap-y-5 w-full my-4">
          {training.sets?.map((set: any, index: number) =>
            isWeight ? (
              <TrainingSet
                key={index}
                valueRight={set.weight}
                valueLeft={set.reps}
                editing={editDetails}
                index={index}
                isWeight
                onValueChange={onValueChange}
              />
            ) : isEndurance ? (
              <TrainingSet
                key={index}
                valueRight={set.speed}
                valueLeft={set.time}
                editing={editDetails}
                index={index}
                isEndurance
                onValueChange={onValueChange}
              />
            ) : null
          )}
          {createNewSet && (
            <TrainingSet
              editing
              index={training.sets.length + 1}
              valueLeft={0}
              valueRight={0}
              isWeight={isWeight}
              isEndurance={isEndurance}
            />
          )}
          {createNewSet ? (
            <div className="flex mt-2 gap-x-8 items-center justify-center">
              <button onClick={() => setCreateNewSet(false)}>
                <Image
                  src="/icon-close.svg"
                  width="26"
                  height="26"
                  alt="close icon"
                />
              </button>
              <button onClick={() => setCreateNewSet(false)}>
                <Image
                  src="/icon-check.svg"
                  width="26"
                  height="26"
                  alt="check icon"
                />
              </button>
            </div>
          ) : (
            <button onClick={() => setCreateNewSet(true)}>
              <Image
                src="/icon-plus.svg"
                width="26"
                height="26"
                alt="plus icon"
                className="mx-auto "
              />
            </button>
          )}
        </div>
      )}
    </li>
  );
};
export default ListElement;
