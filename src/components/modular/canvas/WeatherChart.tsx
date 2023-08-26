import React, { useEffect, useRef, useState } from "react";
import { Chart } from "./Canvas";
import { Spinner } from "@components/atomic/Spinner";
import { useTranslation } from "react-i18next";
import { ppt_key, temp_key, time_key } from "@/const";
import type { CastDataEntry } from "@/types";

/**
 * A chart component for displaying weather data.
 *
 * @component
 * @param {CastDataEntry[]} data - Array of weather data points.
 * @param {boolean} isTemperatureSelected - Flag to show temperature data.
 * @param {boolean} isPrecipitationSelected - Flag to show precipitation data.
 */

type WeatherChartProps = {
   data: CastDataEntry[];
   isTemperatureSelected?: boolean;
   isPrecipitationSelected?: boolean;
};

export const WeatherChart: React.FC<WeatherChartProps> = (props) => {
   const {
      data,
      isTemperatureSelected = true,
      isPrecipitationSelected = true,
   } = props;
   const [loading, setLoading] = useState<boolean>(true);
   const containerRef = useRef<HTMLDivElement>(null);
   const [width, setWidth] = useState<number>(0);
   const [height, setHeight] = useState<number>(0);

   const { t } = useTranslation();

   // update loading state when data changes
   useEffect(() => {
      if (data.length) setLoading(false);
   }, [data]);

   // update canvas dimensions based on container size
   useEffect(() => {
      setWidth(containerRef.current?.clientWidth || 0);
      setHeight(containerRef.current?.clientHeight || 0);
   }, [containerRef]);

   // tailwind utils for the container
   const classList = `flex w-full h-full items-center justify-center`;

   return (
      <div ref={containerRef} className={classList}>
         {loading ? (
            <Spinner />
         ) : (
            <Chart
               width={width}
               height={height}
               data={data}
               xAxisProp={{
                  dataProp: time_key,
                  title: t("time"),
                  isShown: true,
               }}
               yAxisPropList={[
                  {
                     dataProp: temp_key,
                     title: t("temperature"),
                     isShown: isTemperatureSelected,
                  },
                  {
                     dataProp: ppt_key,
                     title: t("precipitation"),
                     isShown: isPrecipitationSelected,
                  },
               ]}
            />
         )}
      </div>
   );
};
