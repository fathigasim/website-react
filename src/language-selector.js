

// import { useEffect } from 'react';
// import { Button, NavItem } from 'react-bootstrap'
// import { useTranslation } from 'react-i18next';
// import { Link, NavLink } from 'react-router-dom';
// const languages =[
//     { code: 'en', name: 'English' },
//     { code: 'fr', name: 'French' },  
//     { code: 'ar', name: 'Arabic' },
// ]
// const   LanguageSelector = () => {
//   const {i18n}= useTranslation();

//   const changeLanguage=(lng)=>{
//     i18n.changeLanguage(lng);
//     }

//   useEffect(() => {
//     const rtlLangs = ['ar'];
//     // document.body.dir = rtlLangs.includes(i18n.language) ? 'rtl' : 'ltr';
//     document.body.dir = i18n.dir(i18n.language) || 'ltr';
//   }, [i18n.language]);

//   return (
//     <div>
//       {languages.map((lang) => (
//         <Button style={{marginRight: '5px'}}
//           key={lang.code}
//           size="sm"
//             className={i18n.language === lang.code && "active"}
//           variant="outline-primary"
//           onClick={() => changeLanguage(lang.code)}
//         >
//           {lang.name}
//         </Button>
//       ))}
//     </div>
//   )}


// export default  LanguageSelector;

import { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const rtlLangs = ["ar"];
    document.body.dir = rtlLangs.includes(i18n.language) ? "rtl" : "ltr";
  }, [i18n.language]);

  const currentLang =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-light" size="sm">
        {currentLang.flag} {currentLang.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {languages.map((lang) => (
          <Dropdown.Item
            key={lang.code}
            active={i18n.language === lang.code}
            onClick={() => changeLanguage(lang.code)}
          >
            {lang.flag} {lang.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;
