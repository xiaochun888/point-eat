import {objectEnumerate} from '@/assets/js/app.utility.js';

export const productType = {
  SERVER: {value: 0, text: 'Mini server'},
  ROUTER: {value: 1, text: 'Mini router'},
  PRINTER: {value: 2, text: 'WiFi printer'},
  TOUCHSCREEN: {value: 3, text: 'Touchscreen'},
  TV: {value: 4, text: 'TV set'},
  IPAD: {value: 5, text: 'iPad'},
  IPHONE: {value: 6, text: 'iPhone'},
  PHONE: {value: 7, text: 'Android phone'},
  TABLET: {value: 8, text: 'Android tablet'},
  KIOSK_SUPPORT: {value: 9, text: 'Kiosk support'},
  POS_SUPPORT: {value: 10, text: 'POS support'},
  CASH_DRAWER: {value: 11, text: 'Cash drawer'}
};

export const productTypeEnum = objectEnumerate(productType);
