export const getYearFromDateString = (time: string) => {
   // takes a string representing the time and returns an integer representing the year
   const d = new Date(time);
   return d.getFullYear();
};

export const isInRange = (number: number, left: number, right: number) => {
   // checks if number is within a certain range
   return number >= left && number <= right;
};
