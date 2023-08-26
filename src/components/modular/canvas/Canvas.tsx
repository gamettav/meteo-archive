import React, { useRef, useEffect } from "react";
import { drawChart } from "@/components/common/canvas";
import type { CastDataEntry, AxisProp } from "@/types";

/**
 * A canvas-based chart component for rendering data.
 *
 * @component
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 * @param {CastDataEntry[]} data - Array of data points to be plotted.
 * @param {AxisProp} xAxisProp - Configuration for the X-axis.
 * @param {AxisProp[]} yAxisPropList - List of configurations for Y-axes.
 */

type ChartProps = {
   width?: number;
   height?: number;
   data: CastDataEntry[];
   xAxisProp: AxisProp;
   yAxisPropList: AxisProp[];
};

export const Chart: React.FC<ChartProps> = ({
   width = 800,
   height = 600,
   data,
   xAxisProp,
   yAxisPropList,
}) => {
   // ref to the canvas element
   const canvasRef = useRef<HTMLCanvasElement>(null);

   // redraw the chart whenever the data or props change
   useEffect(() => {
      drawChart({
         canvasRef,
         data,
         size: { w: width, h: height },
         xAxisProp,
         yAxisPropList,
      });
   }, [data, height, width, xAxisProp, yAxisPropList]);

   return <canvas ref={canvasRef} width={width} height={height} />;
};
