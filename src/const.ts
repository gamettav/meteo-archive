// api that provides hystorical weather data but it's only for 80 years
// export const HYSTORICAL_CAST_API_URL =
//    "https://archive-api.open-meteo.com/v1/archive?latitude=46.3692&longitude=14.1136&start_date=1940-01-01&end_date=2023-08-23&hourly=temperature_2m,precipitation";

export const DB_NAME = "meteo-archive";
export const DB_STORE_NAME_LIST = ["temperature", "precipitation"] as const;
export const DEFAULT_YEAR_RANGE: [number, number] = [1881, 2006];

export const yAxisColors = ["#f59e0b", "#1d4ed8"]; // orange and blue colors

export const generateYearList = (
   startYear: number,
   endYear: number
): number[] => {
   return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
   );
};

export const time_key = "time" as const;
export const temp_key = "temp" as const;
export const ppt_key = "ppt" as const;

export const getDataKey = (storeName: string) => {
   return storeName === DB_STORE_NAME_LIST[0] ? temp_key : ppt_key;
};
