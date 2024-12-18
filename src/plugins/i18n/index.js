import {createI18n} from 'vue-i18n';

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};

  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\.json$/i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });

  return messages;
}

const i18n = createI18n({
  legacy: false, // Using Composition API
  locale: 'vi', // Default language
  fallbackLocale: 'vi', // Backup language
  messages: loadLocaleMessages(), // Load translation files
});

export default i18n;
