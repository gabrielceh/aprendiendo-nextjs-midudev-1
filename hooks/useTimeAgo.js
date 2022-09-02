import { useEffect, useState } from 'react';

// cuantos segundos hay en ...
const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

// hayamos la diferencia entre la fecha actual y la que queremos evaluar
const getDateDiffs = (timestamp) => {
  console.log('getDateDiff');
  const now = Date.now();
  const elapse = (timestamp - now) / 1000;

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapse) > secondsInUnit || unit === 'second') {
      const value = Math.round(elapse / secondsInUnit);
      return { value, unit };
    }
  }
};

export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp));

  const time =
    timeago.unit === 'second'
      ? 5000
      : timeago.unit === 'minute'
      ? 60000
      : timeago.unit === 'hour'
      ? 3600000
      : 86400000;

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp);
      setTimeago(newTimeAgo);
    }, time);

    return () => clearInterval(interval);
  }, [timestamp]);

  const rtf = new Intl.RelativeTimeFormat('es', {
    style: 'short',
  });
  const { value, unit } = timeago;
  return rtf.format(value, unit);
}
