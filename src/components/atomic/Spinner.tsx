type SpinnerSize = "small" | "medium" | "large";

/**
 * A spinner component to display loading state.
 *
 * @param {SpinnerSize} [size="medium"] - The size of the spinner ("small", "medium", "large").
 * @param {string} [color="text-blue-500"] - The color class for the spinner.
 * @returns {JSX.Element} The rendered Spinner component.
 *
 * @component
 * @example
 * // Renders a medium-sized spinner with blue color
 * <Spinner size="medium" color="text-blue-500" />
 */

type SpinnerProps = {
   size?: SpinnerSize;
   color?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({
   size = "medium",
   color = "text-blue-500",
}) => {
   const spinnerAnimation = "animate-spin";
   const spinnerSize = calcSpinnerSize(size);

   // define classes for the svg element
   const classList = `inline-block ${spinnerSize} ${spinnerAnimation} ${color}`;

   return (
      <svg
         className={classList}
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
      >
         <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
         ></circle>
         <path
            className={`opacity-75 ${color}`}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-3.647z"
         ></path>
      </svg>
   );
};

const calcSpinnerSize = (size: SpinnerSize, defaultSize = "h-4 w-4") => {
   // returns spinner size as tailwind class utils
   if (size === "medium") {
      defaultSize = "h-6 w-6";
   } else if (size === "large") {
      defaultSize = "h-8 w-8";
   }
   return defaultSize;
};
