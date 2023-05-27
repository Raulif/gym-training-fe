import {
  ChangeEventHandler,
  InputHTMLAttributes,
  SyntheticEvent,
  useState,
} from "react";

type Props = {
  valueRight: number;
  valueLeft: number;
  editing?: boolean;
  index?: number;
  isWeight?: boolean;
  isEndurance?: boolean;
  onValueChange?: (value: number, field: string, setIndex: number) => void;
};

const TrainingSet = ({
  valueRight,
  valueLeft,
  editing,
  index,
  isWeight,
  isEndurance,
  onValueChange,
}: Props) => {
  const [newValueLeft, setNewValueLeft] = useState<number>(valueLeft);
  const [newValueRight, setNewValueRight] = useState<number>(valueRight);

  const onLeftChange = (event: any) => {
    const value = parseInt(event.target.value);
    setNewValueLeft(value);
    onValueChange && onValueChange(value, 'valueLeft', index || 0);
  };

  const onRightChange = (event: any) => {
    const value = parseInt(event.target.value);
    setNewValueRight(value);
    onValueChange && onValueChange(value, 'valueRight', index || 0);
  };

  return (
    <div className="flex flex-1 flex-row color-white items-center justify-between h-8">
      <p>{(index || 0) + 1}.</p>
      <p className="text-base">Set</p>
      <div className="flex flex-1 gap-x-1 items-center justify-end">
        {editing ? (
          <input
            className="text-right text-lg max-w-[4rem]"
            value={newValueLeft}
            type="number"
            onChange={onLeftChange}
          />
        ) : (
          <p className="py-[2px]">{valueLeft}</p>
        )}
        <p className="text-base">
          {isWeight ? "Reps." : isEndurance ? "Min." : null}
        </p>
      </div>
      <div className="flex flex-1 gap-x-1 items-center justify-end">
        {editing ? (
          <input
            className="text-right px-1 text-lg max-w-[4rem]"
            value={newValueRight}
            type="number"
            onChange={onRightChange}
          />
        ) : (
          <p>{valueRight}</p>
        )}
        <p className="text-base">
          {isWeight ? "Kg." : isEndurance ? "Km/h" : null}
        </p>
      </div>
    </div>
  );
};

export default TrainingSet;
