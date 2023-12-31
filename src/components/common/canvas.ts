import React from "react";
import { yAxisColors } from "@/const";
import type {
   AxisProp,
   DailyCastData,
   WeatherProps,
   CastDataEntry,
} from "@/types";

type Size = {
   w: number;
   h: number;
};

type DrawChartParams = {
   canvasRef: React.RefObject<HTMLCanvasElement>;
   data: CastDataEntry[];
   size: Size;
   xAxisProp: AxisProp;
   yAxisPropList: AxisProp[];
};

const fontFamily = " Inter, Avenir, Helvetica, Arial, sans-serif";

// it's better to split this fn
export const drawChart = ({
   canvasRef,
   data,
   size,
   xAxisProp,
   yAxisPropList,
}: DrawChartParams) => {
   const canvas = canvasRef.current;
   const ctx = canvas?.getContext("2d");

   if (ctx && canvas && data.length && data[0].data.length) {
      canvas.width = size.w;
      canvas.height = size.h;
      // clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const margin = 50;

      const xAxisDataProp = xAxisProp.dataProp;
      const xValues = data[0].data.map(
         (entry: DailyCastData) => entry[xAxisDataProp]
      ) as string[];

      const xScale = (width - margin * 2) / (xValues.length - 1);

      // draw x-axis labels
      const xLabelStep = Math.ceil(xValues.length / 10);
      xValues.forEach((value, index) => {
         if (index % xLabelStep === 0) {
            const x = margin + index * xScale;
            ctx.fillText(value, x, height - margin + 20);
         }
      });

      const yLabelOffset = 15;
      const xLabelOffset = 40;
      yAxisPropList.forEach((yAxisProp, dataSetIndex) => {
         if (yAxisProp.isShown !== false) {
            const yDataProp = yAxisProp.dataProp as WeatherProps;
            const { min: minY, max: maxY } = getMinMax(
               data[dataSetIndex].data,
               yDataProp
            );

            const yScale = (height - margin * 2) / (maxY - minY);

            // draw y data
            ctx.beginPath();
            ctx.strokeStyle = yAxisColors[dataSetIndex % yAxisColors.length];
            data[dataSetIndex].data.forEach((entry, index) => {
               const x = margin + index * xScale;
               const yValue = entry[yDataProp];
               if (yValue) {
                  const y = height - margin - (yValue - minY) * yScale;
                  if (index === 0) {
                     ctx.moveTo(x, y);
                  } else {
                     ctx.lineTo(x, y);
                  }
               }
            });
            ctx.stroke();

            // draw y-axis labels with values
            const numLabels = 5;
            const yLabelStep = (maxY - minY) / numLabels;
            for (let i = 0; i <= numLabels; i++) {
               const labelValue = minY + i * yLabelStep;
               const y = height - margin - (labelValue - minY) * yScale;
               ctx.fillText(
                  `${labelValue.toFixed(1)}`,
                  dataSetIndex === 0 ? margin - 40 : width - margin + 20,
                  y
               );
            }

            // draw y-axis title
            const yAxisTitleX =
               dataSetIndex === 0
                  ? margin - yLabelOffset
                  : width - margin + yLabelOffset;
            const yAxisTitleY = height / 2;
            ctx.save();
            ctx.translate(yAxisTitleX, yAxisTitleY);
            ctx.rotate(-Math.PI / 2);
            ctx.font = "14px" + fontFamily;
            ctx.fillText(yAxisProp.title, 0, 0);
            ctx.restore();
         }
      });

      // draw x-axis title
      const xAxisTitleX = width / 2;
      const xAxisTitleY = height - margin + xLabelOffset;
      ctx.font = "16px" + fontFamily;
      ctx.fillText(xAxisProp.title, xAxisTitleX, xAxisTitleY);

      // adding legend
      const legendSpacing = 100;
      ctx.font = "12px" + fontFamily;
      ctx.lineWidth = 12;
      ctx.textAlign = "left";

      yAxisPropList.forEach((yAxisProp, dataSetIndex) => {
         if (yAxisProp.isShown !== false) {
            const legendX = 8 + dataSetIndex * legendSpacing;

            ctx.fillText(yAxisProp.title, legendX + 16, 16);

            ctx.beginPath();
            ctx.moveTo(legendX, 20);
            ctx.lineTo(legendX + 12, 20);
            ctx.strokeStyle = yAxisColors[dataSetIndex % yAxisColors.length];
            ctx.stroke();
         }
      });
   }
};

const getMinMax = (dataArray: DailyCastData[], property: WeatherProps) => {
   const values = dataArray
      .map((entry) => entry[property])
      .filter((value) => typeof value === "number") as number[]; // Filter out undefined values

   return {
      min: Math.min(...values),
      max: Math.max(...values),
   };
};
