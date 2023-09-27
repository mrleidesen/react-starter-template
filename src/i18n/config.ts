import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './en/translation.json';
import translationCn from './zh/translation.json';

// FIXME: 自行处理 i18n
i18next.use(initReactI18next).init({
  lng: 'zh', // if you're using a language detector, do not define the lng option
  debug: false,
  resources: {
    en: {
      translation: translationEn,
    },
    zh: {
      translation: translationCn,
    },
  },
  fallbackLng: ['zh', 'en'],
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
});
