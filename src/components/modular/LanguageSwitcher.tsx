import { useTranslation } from "react-i18next";

/**
 * Language switcher component.
 *
 * @component
 */

export const LanguageSwitcher = () => {
   const { i18n } = useTranslation();

   // fn to change the language
   const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng);
   };

   // tailwind utils for the select element
   const classList =
      "bg-none px-4 py-2 border rounded-md text-blue-500 focus:outline-none focus:ring focus:border-blue-500";
   return (
      <div>
         <select
            onChange={(val) => changeLanguage(val.target.value)}
            className={classList}
         >
            <option value="en">English</option>
            <option value="fr">Français</option>
         </select>
      </div>
   );
};
