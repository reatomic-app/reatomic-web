import Vue from "vue";
import { configure, ValidationProvider, ValidationObserver } from "vee-validate";
import i18n from "@/commons/i18n/i18n";

export const vueSetupValidation = () => {
  Vue.component("ValidationProvider", ValidationProvider);
  Vue.component("ValidationObserver", ValidationObserver);
}

/**
 * Configures i18n validation messages using current i18n general messages
 */
configure({
    defaultMessage: (field, values = {}) => {
      const fieldName: string = `fields.${field.toString()}`.toString();
      const validationKey = `VALIDATIONS.${values._rule_}`;
  
      values._field_ = i18n.t(fieldName);
      return i18n.t(validationKey, values).toString();
    },
});