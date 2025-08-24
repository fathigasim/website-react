import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';

// const apiKey = ""; // Add ypur API key;
// const loadPath = ``; // Add your loadpath;

i18n
    .use(LanguageDetector)
    .use(initReactI18next).use(Backend)
    .init({
        // The default language
         fallbackLng: "en",
        debugger: true,
     
     returnObjects: true,
        // ns: ["default"],
        // defaultNS: "default",

        // Tt shows the supported languages
        // supportedLngs: ["en", "fr", "ar"],
        // backend: {
        //     loadPath: loadPath,
        // },
        // resources:{
        //     en: {
        //         translation: {
        //             welcome: "Welcome to our application",
        //             description: {
        //                 line1:"<1>{{channel}}</1>",
        //                 line2:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}}
        //       },
        //     fr: {
        //          translation: {
        //             welcome: "Bienvenue dans notre application",
        //             description:{
        //                line1:"<1>{{channel}}</1>",
        //                 line2:"Le1Lorem Ipsum es1 simplement du faux texte employé dans la composition et la mise en page avant impression."
        //             }
        //         }
        //         },
        //     ar: { translation: {
        //             welcome: "مرحبا بكم في تطبيقنا",
        //             description:{
        //                 line1:"<1>{{channel}}</1>",
        //                 line2:"وريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص"
        //             }
                
        //         }}
        //     }
    });