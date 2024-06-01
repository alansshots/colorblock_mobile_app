import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import {en, bg} from '../translations'

const resources = {
    en: {
        translation: en,
    },
    bg: {
        translation: bg,
    }
}

i18next.use(initReactI18next).init({
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
})

export default i18next;