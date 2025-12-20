import { usePage } from '@inertiajs/react';
import get from 'lodash/get';

const useI18n = () => {
  const { i18n } = usePage().props;

  const t = (key, params = {}) => {
    let translation = get(i18n, key);

    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return `[MISSING: ${key}]`;
    }

    // 3. Interpolacja parametrów (zamiana %{param} na wartość)
    // To jest uproszczona wersja, która może wymagać bardziej zaawansowanej biblioteki do interpolacji
    Object.keys(params).forEach(param => {
      translation = translation.replace(new RegExp(`%\{${param}\}`, 'g'), params[param]);
    });

    return translation;
  };

  return { t };
};

export default useI18n;