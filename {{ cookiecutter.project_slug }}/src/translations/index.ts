import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import ru from './languages/ru.json';
import en from './languages/en.json';

export const defaultNS = 'translation';
export const resources = [ru, en] as const;

const getLangCode = () => {
  return 'en';
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: getLangCode(),
  defaultNS: 'translation',
  resources: {en, ru},
});

export default i18n;
