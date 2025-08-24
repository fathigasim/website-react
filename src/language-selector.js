

import { useEffect } from 'react';
import { Button, NavItem } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
const languages =[
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },  
    { code: 'ar', name: 'Arabic' },
]
const   LanguageSelector = () => {
  const {i18n}= useTranslation();

  const changeLanguage=(lng)=>{
    i18n.changeLanguage(lng);
    }

  useEffect(() => {
    const rtlLangs = ['ar'];
    // document.body.dir = rtlLangs.includes(i18n.language) ? 'rtl' : 'ltr';
    document.body.dir = i18n.dir(i18n.language) || 'ltr';
  }, [i18n.language]);

  return (
    <div>
      {languages.map((lang) => (
        <Button style={{marginRight: '5px'}}
          key={lang.code}
          size="sm"
            className={i18n.language === lang.code && "active"}
          variant="outline-primary"
          onClick={() => changeLanguage(lang.code)}
        >
          {lang.name}
        </Button>
      ))}
    </div>
  )}


export default  LanguageSelector;
