import { useState } from "react";

type Props = {
  name: string;
  editing?: boolean;
  onChange?: (name: string) => void;
  onClick?: () => void;
}

const EditableName = ({
  name,
  editing,
  onChange,
  onClick,
}:Props) => {
  return editing ? (
    <input
      className="text-left text-[1.1rem] flex-1 p-1"
      value={name}
      onChange={(event) => onChange && onChange(event.target.value)}
    />
  ) : (
    <button
      onClick={onClick}
      className="truncate text-[1.1rem] flex-1 text-left"
    >
      {name}
    </button>
  );
};

export default EditableName;
