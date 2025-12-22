// app/javascript/utils/useI18n.js
import { I18n } from "i18n-js";
import { usePage } from "@inertiajs/react";
import translations from "../locales.json"; // Plik wygenerowany przez i18n-js export

// Inicjalizacja instancji poza hookiem (Singleton)
const i18n = new I18n(translations);

export const useI18n = () => {
  const { props } = usePage();

  // Pobieramy aktualny język z shared props (np. z application_controller.rb)
  const currentLocale = props.locale || 'pl';
  i18n.locale = currentLocale;

  /**
   * Funkcja tłumacząca
   * @param {string} key - Klucz tłumaczenia
   * @param {object} options - Parametry (np. count dla paginacji)
   */
  const t = (key, options = {}) => {
    return i18n.t(key, options);
  };

  /**
   * Odpowiednik Railsowego Model.human_attribute_name(attr)
   * @param {string} modelName - nazwa modelu (np. 'user')
   * @param {string} attribute - nazwa pola (np. 'email')
   */
  const h = (modelName, attribute) => {
    // Rails szuka w activerecord.attributes.model.attribute
    return t(`activerecord.attributes.${modelName.toLowerCase()}.${attribute}`);
  };

  return { t, h, locale: currentLocale, i18n };
};