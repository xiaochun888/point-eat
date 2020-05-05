import { objectEnumerate } from '@/assets/js/app.utility.js';

export const i18nDefine = {
  CHINESE: { value: 'cn', text: '中文' },
  ENGLISH: { value: 'en', text: 'EN' },
  FRENCH: { value: 'fr', text: 'FR' }
};

export const i18nDefineEnum = objectEnumerate(i18nDefine);
