import { Stack } from "../layup/Stack";
import { v4 as uuidv4 } from "uuid";

/**
 * A checkbox component.
 *
 * @param {string} label - The label to display above the checkbox.
 * @param {boolean} isSelected - Indicates whether the checkbox is selected.
 * @param {function} onClick - The function to call when the checkbox is clicked.
 * @param {string} [color="bg-blue-500"] - The color class for the checkbox background.
 * @returns {JSX.Element} The rendered Checkbox component.
 *
 * @component
 * @example
 * // Renders a checkbox with a label "Toggle" and handles click event
 * <Checkbox label="Toggle" isSelected={isChecked} onClick={handleClick} />
 */

type CheckboxProps = {
   label: string;
   isSelected: boolean;
   onClick(id: string, value: boolean): void;
   color?: string;
};

export const Checkbox: React.FC<CheckboxProps> = (props) => {
   const { label, isSelected, onClick, color = "bg-blue-500" } = props;

   // generate a unique ID for the checkbox
   const id = uuidv4();

   // define classes for the button element
   const buttonClasses = `px-4 py-2 rounded border focus:outline-none ${
      isSelected ? color + " " + "text-white" : "bg-gray-100 text-gray-800"
   }`;

   return (
      <Stack direction="row-reverse" spacing={2}>
         <label htmlFor={id}></label>
         <button
            className={buttonClasses}
            type="button"
            id={id}
            onClick={() => {
               onClick(id, !isSelected);
            }}
         >
            {label}
         </button>
      </Stack>
   );
};
