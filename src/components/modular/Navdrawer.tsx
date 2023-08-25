import React from "react";
import { Checkbox } from "../atomic/Checkbox";
import { Stack } from "../layup/Stack";
import { useTranslation } from "react-i18next";

/**
 * Navigation drawer component for selecting data options.
 *
 * @component
 */

type NavdrawerProps = {
   onClick(chart: string, value: boolean): void;
   isTemperatureSelected: boolean;
   isPrecipitationSelected: boolean;
};

export const Navdrawer: React.FC<NavdrawerProps> = (props) => {
   const { isTemperatureSelected, isPrecipitationSelected, onClick } = props;

   const { t } = useTranslation();

   return (
      <Stack
         direction="col"
         spacing={3}
         items="start"
         customUtils="p-2 pt-2 border-r-2 border-blue-500 h-full"
      >
         <Checkbox
            label={t("temperature")}
            isSelected={isTemperatureSelected}
            onClick={() => {
               onClick("temperature", !isTemperatureSelected);
            }}
            color="bg-amber-500"
         />
         <Checkbox
            label={t("precipitation")}
            isSelected={isPrecipitationSelected}
            onClick={() => {
               onClick("precipitation", !isPrecipitationSelected);
            }}
            color="bg-blue-700"
         />
      </Stack>
   );
};
