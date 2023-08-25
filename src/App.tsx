import { useState, useEffect } from "react";
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
import { getCastData } from "./db";

import type { DailyCastData } from "./types";

const yearList = generateYearList(...DEFAULT_YEAR_RANGE);

function App() {
   const { t } = useTranslation();
   const [isTemperatureSelected, setIsTemperatureSelected] = useState(true);
   const [isPrecipitationSelected, setIsPrecipitationSelected] = useState(true);
   const [data, setData] = useState<DailyCastData[]>([]);
   const [startYear, setStartYear] = useState<number>();
   const [endYear, setEndYear] = useState<number>();

   useEffect(() => {
      // fetch data for chart when page mounts
      const fetchData = async () => {
         try {
            const data = await getCastData();

            if (data.length) {
               setData(data);
               // year list may be calculated based on data (map data and put it into set)
               setStartYear(yearList[0]);
               setEndYear(yearList[yearList.length - 1]);
            }
         } catch (err) {
            console.error(err);
         }
      };

      fetchData();
   }, []);

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
   data: DailyCastData[],
   startYear: number | undefined,
   endYear: number | undefined
) => {
   return data.filter(({ time }) => {
      // filter data based on selected year range
      if (startYear && endYear) {
         const year = getYearFromDateString(time);
         return isInRange(year, startYear, endYear);
      }
      return false; // or adjust behavior for no year range
   });
};

export default App;
