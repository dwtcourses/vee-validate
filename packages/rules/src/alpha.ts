import { alpha, getLocale } from './alpha_helper';

const alphaValidator = (value: unknown, params: [string | undefined] | { locale?: string }): boolean => {
  const locale = getLocale(params);
  if (Array.isArray(value)) {
    return value.every(val => alphaValidator(val, { locale }));
  }

  const valueAsString = String(value);
  // Match at least one locale.
  if (!locale) {
    return Object.keys(alpha).some(loc => alpha[loc].test(valueAsString));
  }

  return (alpha[locale] || alpha.en).test(valueAsString);
};

export default alphaValidator;
