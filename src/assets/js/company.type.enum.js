import {objectEnumerate} from '@/assets/js/app.utility.js';

export const companyType = {
  RESTAURANT: {value: 0, text: 'Restaurant'},
  FAST_FOOD: {value: 1, text: 'Fast Food'},
  SNACK: {value: 2, text: 'Snack'},
  BAR: {value: 3, text: 'Bar'},
  BUFFET: {value: 4, text: 'Buffet'},
  CANTEEN: {value: 5, text: 'Canteen'},
  BAKERY: {value: 6, text: 'Bakery'},
  PIZZERIA: {value: 7, text: 'Pizzeria'},
  BREWERY: {value: 8, text: 'Brewery'},
  OTHERS: {value: 9, text: 'Others'}
};

export const companyTypeEnum = objectEnumerate(companyType);
