import { useState } from "react";
import {
   Header,
   Navdrawer,
   Stack,
   WeatherChart,
   YearSelect,
} from "./components";
import { getYearFromDateString, isInRange } from "./utils/dates";
import { DEFAULT_YEAR_RANGE, generateYearList } from "./const";
import { useTranslation } from "react-i18next";

import type { CastDataEntry } from "./types";
import { useData } from "./hooks/useData";

const yearList = generateYearList(...DEFAULT_YEAR_RANGE);

function App() {
   const { t } = useTranslation();
   const [isTemperatureSelected, setIsTemperatureSelected] = useState(true);
   const [isPrecipitationSelected, setIsPrecipitationSelected] = useState(true);
   const [startYear, setStartYear] = useState<number>();
   const [endYear, setEndYear] = useState<number>();

   const data = useData({ setStartYear, setEndYear, yearList });

   const handleToggleDataSelection = (chart: string, value: boolean) => {
      // toggle data selection handler
      if (chart === "temperature") setIsTemperatureSelected(value);
      if (chart === "precipitation") setIsPrecipitationSelected(value);
   };

   const filteredData = filterData(data, startYear, endYear);

   return (
      <Stack direction="col" customUtils="w-screen h-screen">
         <Header title={t("meteo-archive")} />
         <Stack spacing={3} customUtils="h-full">
            <Navdrawer
               isPrecipitationSelected={isPrecipitationSelected}
               isTemperatureSelected={isTemperatureSelected}
               onClick={handleToggleDataSelection}
            />
            <Stack direction="col" customUtils="w-full h-full" spacing={5}>
               <YearSelect
                  onSelectEndYear={setEndYear}
                  onSelectStartYear={setStartYear}
                  startYear={startYear}
                  endYear={endYear}
                  yearList={yearList}
               />
               <WeatherChart
                  isTemperatureSelected={isTemperatureSelected}
                  isPrecipitationSelected={isPrecipitationSelected}
                  data={filteredData}
               />
            </Stack>
         </Stack>
      </Stack>
   );
}

const filterData = (
   data: CastDataEntry[],
   startYear: number | undefined,
   endYear: number | undefined
) => {
   return data.map((dataset) => {
      const filteredDataset = {
         type: dataset.type,
         data: dataset.data.filter(({ time }) => {
            // filter data based on selected year range
            if (startYear && endYear) {
               const year = getYearFromDateString(time);
               return isInRange(year, startYear, endYear);
            }
            return false; // or adjust behavior for no year range
         }),
      };
      return filteredDataset;
   });
};

export default App;
