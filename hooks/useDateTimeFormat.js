import { DEFAULT_LANGUAGE } from 'constants/locale';

export default function useDateTimeFormat(timestamp) {
  const date = new Date(timestamp);
  const language = DEFAULT_LANGUAGE;

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const format = new Intl.DateTimeFormat(language, options).format(date);
  console.log(format);
  return format;
}
