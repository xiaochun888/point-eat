import {objectEnumerate} from '@/assets/js/app.utility.js';

export const softwareSuite = {
  CASH_DESK: {value: 0, text: 'Cash desk'},
  ORDERING_SYSTEM: {value: 1, text: 'Ordering system'},
  COMPLETE: {value: 2, text: 'Cash desk + Ordering system'}
};

export const softwareEnum = objectEnumerate(softwareSuite);
