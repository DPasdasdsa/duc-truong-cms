import {defineRule, configure, Form, Field, ErrorMessage} from 'vee-validate';
import {localize} from '@vee-validate/i18n';
import vi from '@vee-validate/i18n/dist/locale/vi.json';
import en from '@vee-validate/i18n/dist/locale/en.json';
import {required, email, min, max, between, alpha, numeric} from '@vee-validate/rules';

// Define rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
defineRule('between', between);
defineRule('alpha', alpha);
defineRule('numeric', numeric);

// Custom Rule: decimal
defineRule('decimal', (value, {decimals = '*'} = {}, ctx) => {
  if (!value || parseFloat(value) === 0) {
    return `Trường ${ctx.field} là bắt buộc`;
  }
  if (Number(decimals) === 0) {
    return /^-?\d*$/.test(value) || `Trường ${ctx.field} phải là số nguyên`;
  }
  const regexp = /^\d+(\.\d{1,2})?$/;
  return regexp.test(value) || `Trường ${ctx.field} phải là số và không quá hai số thập phân`;
});

// Custom Rule: url
defineRule('url', (value = '', ctx) => {
  const regexp = /^(ftp|http|https):\/\/[^ "]+$/;
  return regexp.test(value) || `Trường ${ctx.field} phải là một link hợp lệ`;
});

// Custom Rule: facebookUrl
defineRule('facebookUrl', (value = '', ctx) => {
  const facebookRegex = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9.]+\/?$/;
  return facebookRegex.test(value) || `Trường ${ctx.field} phải là một đường link Facebook hợp lệ`;
});

// Configure i18n
configure({
  generateMessage: localize({
    en,
    vi
  }),
  validateOnInput: true, // Auto validate on input
});
export const setLanguage = (lang) => {
  configure({
    generateMessage: localize(lang),
  });
};
setLanguage('vi')
export default {
  install(app) {
    app.component('Form', Form);
    app.component('Field', Field);
    app.component('ErrorMessage', ErrorMessage);
  },
};
