import Vue from "vue"
import VueI18n, { LocaleMessages, DateTimeFormats } from "vue-i18n";

Vue.use(VueI18n);

// eslint-disable-next-line
const processMessages = (locales: any, messages: any): any => {
    locales.keys().forEach((key: string) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
      return messages;    
}

/**
 * Loads all general i18n messages from json files
 */
const loadGeneralMessages = (): LocaleMessages => {
    const messages: LocaleMessages = {};

    if (process.env.NODE_ENV === "test") {
        return messages;
    }
    
    return processMessages(
        require.context("./general", true, /[A-Za-z0-9-_,\s]+\.json$/i), 
        messages
    );
}

/**
 * Loads all date time formats messages from json files
 */
const loadDateTimeFormats = (): DateTimeFormats => {
    const messages: DateTimeFormats = {};

    if (process.env.NODE_ENV === "test") {
        return messages;
    }
    
    return processMessages(
        require.context("./dates", true, /[A-Za-z0-9-_,\s]+\.json$/i), 
        messages
    );
}

/**
 * Configures and initializes VueI18N
 */
const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadGeneralMessages() as LocaleMessages,
  silentTranslationWarn: process.env.NODE_ENV !== "development",
  dateTimeFormats: loadDateTimeFormats() as DateTimeFormats,
});

export default i18n;
