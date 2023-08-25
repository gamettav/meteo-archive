import { LanguageSwitcher } from "./LanguageSwitcher";
import { Stack } from "../layup/Stack";

/**
 * Header component with title and language switcher.
 *
 * @component
 * @param {string} title - The title to display in the header.
 */

type HeaderProps = {
   title: string;
};

export const Header = ({ title }: HeaderProps) => {
   // tailwind utils for the title
   const h1ClassList = "text-4xl text-blue-500";

   return (
      <Stack
         direction="row"
         items="center"
         justify="between"
         customUtils="p-4 w-full border-b-2 border-blue-500"
      >
         <h1 className={h1ClassList}>{title}</h1>
         <LanguageSwitcher />
      </Stack>
   );
};
