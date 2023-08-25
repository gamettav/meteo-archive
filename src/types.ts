import { temp_key, time_key, ppt_key } from "./const";

export type DailyCastData = {
   time: string;
   temp: number;
   ppt: number;
};

export type WeatherProps = typeof temp_key | typeof ppt_key;

export type CastProps = typeof time_key | WeatherProps;

export type AxisProp = {
   dataProp: CastProps;
   title: string;
   isShown?: boolean;
};
