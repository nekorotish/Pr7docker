import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'
import en from '../locales/en.json';
import rus from '../locales/rus.json';

export const languageResources = {
    en: {translation: en},
    rus: {translation: rus}
}

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'rus',
    fallbackLng: 'rus',
    resources: languageResources,
});

export default i18next;