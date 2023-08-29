import { getCastData } from "@/db";
import { CastDataEntry } from "@/types";
import React, { useEffect, useState } from "react";

type UseDataHook = {
   setStartYear: React.Dispatch<React.SetStateAction<number | undefined>>;
   setEndYear: React.Dispatch<React.SetStateAction<number | undefined>>;
   yearList: number[];
};

// it's better to use react query for stuff like this. but here it may be an overkill
export const useData = ({
   setStartYear,
   setEndYear,
   yearList,
}: UseDataHook): CastDataEntry[] => {
   const [data, setData] = useState<CastDataEntry[]>([]);
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

   return data;
};
