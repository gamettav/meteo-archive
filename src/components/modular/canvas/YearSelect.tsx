import { Stack } from "@/components";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

/**
 * A year selection component.
 *
 * @component
 * @param {number | undefined} startYear - The starting year in the range.
 * @param {number | undefined} endYear - The ending year in the range.
 * @param {number[]} yearList - List of available years.
 * @param {(year: number) => void} onSelectStartYear - Callback for selecting the starting year.
 * @param {(year: number) => void} onSelectEndYear - Callback for selecting the ending year.
 */

type YearSelectProps = {
   startYear: number | undefined;
   endYear: number | undefined;
   yearList: number[];
   onSelectStartYear: (year: number) => void;
   onSelectEndYear: (year: number) => void;
};

export const YearSelect: React.FC<YearSelectProps> = ({
   yearList,
   onSelectStartYear,
   onSelectEndYear,
   startYear = yearList[0],
   endYear = yearList[yearList.length - 1],
}) => {
   const { t } = useTranslation();

   return (
      <Stack spacing={2}>
         {/* Autocomplete for selecting the starting year */}
         <Autocomplete
            label={t("from")}
            yearList={yearList}
            onSelectYear={onSelectStartYear}
            year={startYear}
         />
         {/* Autocomplete for selecting the ending year */}
         <Autocomplete
            label={t("to")}
            yearList={yearList}
            onSelectYear={onSelectEndYear}
            year={endYear}
         />
      </Stack>
   );
};

type AutocompleteProps = {
   label: string;
   year: number | undefined;
   yearList: number[];
   onSelectYear: (year: number) => void;
};

/**
 * Autocomplete input for year selection.
 *
 * @component
 * @param {string} label - The label for the input.
 * @param {number | undefined} year - The currently selected year.
 * @param {number[]} yearList - List of available years.
 * @param {(year: number) => void} onSelectYear - Callback for selecting a year.
 */

const Autocomplete: React.FC<AutocompleteProps> = ({
   label,
   yearList,
   onSelectYear,
   year = "",
}) => {
   // state for input value, dropdown visibility and filtered years
   const [inputValue, setInputValue] = useState<string>(year.toString());
   const [isDropdownShown, setIsDropdownShown] = useState<boolean>(false);
   const [filteredYears, setFilteredYears] = useState<number[]>([]);

   const { t } = useTranslation();

   // update filtered years based on input value
   useEffect(() => {
      if (inputValue.length > 0) {
         const filtered = yearList.filter((year) =>
            year.toString().startsWith(inputValue)
         );
         setFilteredYears(filtered);
      } else {
         setFilteredYears([]);
      }
   }, [inputValue, yearList]);

   // handle input change
   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsDropdownShown(true);
      setInputValue(event.target.value);
   };

   // handle year selection
   const handleYearSelect = (year: number) => {
      setInputValue(year.toString());
      setFilteredYears([]);
      onSelectYear(year);
      setIsDropdownShown(false);
   };

   const id = uuidv4();

   return (
      <div className="relative">
         <Stack
            spacing={2}
            items="center"
            direction="col"
            customUtils="max-h-f h-50"
         >
            <label htmlFor={id}>{label}</label>
            <input
               id={id}
               type="text"
               value={inputValue}
               onChange={handleInputChange}
               placeholder={t("enter-year")}
               className="border border-gray-300 px-3 py-2 rounded"
            />
            {filteredYears.length > 0 && isDropdownShown && (
               <ul className="absolute border border-gray-300 mt-[80px] w-[150px] text-center max-h-[250px] bg-white overflow-y-auto">
                  {filteredYears.map((year) => (
                     <li
                        key={year}
                        className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                        onClick={() => {
                           console.log("hey");
                           handleYearSelect(year);
                        }}
                     >
                        {year}
                     </li>
                  ))}
               </ul>
            )}
         </Stack>
      </div>
   );
};
