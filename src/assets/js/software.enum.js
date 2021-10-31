import {objectEnumerate} from '@/assets/js/app.utility.js';

export const softwareSuite = {
  CASH_DESK: {value: 0, text: 'Cash desk'},
  ORDERING_SYSTEM: {value: 1, text: 'Ordering system'},
  WAREHOUSING_SYSTEM: {value: 2, text: 'Warehousing system'}
};

export const softwareEnum = objectEnumerate(softwareSuite);
