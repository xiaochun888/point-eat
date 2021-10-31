import {objectEnumerate} from '@/assets/js/app.utility.js';

export const softwareSuite = {
  CASHIER_SYSTEM: {value: 0, text: 'Cashier system'},
  ORDERING_SYSTEM: {value: 1, text: 'Ordering system'},
  STORAGE_SYSTEM: {value: 2, text: 'Storage system'}
};

export const softwareEnum = objectEnumerate(softwareSuite);
