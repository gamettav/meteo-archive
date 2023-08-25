import type { PropsWithChildren } from "react";

/**
 * A utility component to create flex container layouts.
 *
 * @param {Direction} direction - The flex direction (row, col, row-reverse, col-reverse).
 * @param {AlignItems} items - The alignment of items along the cross-axis.
 * @param {JustifyContent} justify - The alignment of items along the main axis.
 * @param {number} spacing - Spacing between items.
 * @param {string} customUtils - Additional custom utility classes.
 * @returns {JSX.Element} A flex container with specified layout and styles.
 *
 * @example
 * <Stack direction="col" spacing={4} items="center" justify="between">
 *   {/* Child components *\/}
 * </Stack>
 */

// TODO: add https://github.com/danpacho/tailwindest for better tailwind utils persistance
type Direction = "row" | "col" | "row-reverse" | "col-reverse";
type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";
type JustifyContent =
   | "normal"
   | "start"
   | "end"
   | "center"
   | "between"
   | "around"
   | "evenly"
   | "stretch";

type StackProps = PropsWithChildren<{
   direction?: Direction;
   items?: AlignItems;
   justify?: JustifyContent;
   spacing?: number;
   customUtils?: string;
}>;

export const Stack: React.FC<StackProps> = ({
   direction = "row",
   spacing = 0,
   items = "baseline",
   justify = "normal",
   customUtils = "",
   children,
}) => {
   // compose the list of classes for the flex container
   const classList = `flex flex-${direction} gap-${spacing} items-${items} justify-${justify} ${customUtils}`;
   return <div className={classList}>{children}</div>;
};
