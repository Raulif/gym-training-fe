"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { DataContext } from "@/components/DataProvider";
import { get } from "http";
import ListElement from "@/components/ListElement";

export default function Home() {
  const { dayOneTrainings, dayTwoTrainings } = useContext(DataContext);
  const [filterList, setFilterList] = useState<1 | 2 | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  const onFilterClick = () => {
    if (filterList) setFilterList(null)
    else setShowFilter(!showFilter);
  };
  
  const onFilterSelect = (number: 1 | 2) => {
    setFilterList(number)
    setShowFilter(false);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between py-10 px-4 max-w-[600px] mx-auto">
        <div className="w-24 h-10 absolute right-2 top-2 text-right font-mono text-sm">
          <button
            onClick={onFilterClick}
            className="color-white underline mb-2"
          >
            {filterList ? 'Filter entfernen' : 'Tag filtern'}
          </button>
          {showFilter && (
            <div className="flex gap-x-4">
              <button
                onClick={() => onFilterSelect(1)}
                className="flex-1 bg-gray-800"
              >
                1
              </button>
              <button
                onClick={() => onFilterSelect(2)}
                className="flex-1 bg-gray-800"
              >
                2
              </button>
            </div>
          )}
        </div>
      <div className="w-full font-mono text-sm flex flex-col">
        {filterList !== 2 && <><h3>Oberkörper</h3>
        <ul className="flex flex-col gap-4 mt-10 mb-12">
          {dayOneTrainings?.map((training) => (
            <ListElement key={training.id} training={training} />
          ))}
        </ul></>}
        {filterList !== 1 && <><h3>Unterkörper</h3>
        <ul className="flex flex-col gap-4 my-10">
          {dayTwoTrainings?.map((training) => (
            <ListElement key={training.id} training={training} />
          ))}
        </ul></>}
      </div>
    </main>
  );
}
