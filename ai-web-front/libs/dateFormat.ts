export default function dateFormat(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const monthS = month >= 10 ? month : '0' + month;
  const dayS = day >= 10 ? day : '0' + day;
  const hourS = hour >= 10 ? hour : '0' + hour;
  const minuteS = minute >= 10 ? minute : '0' + minute;

  return (
    date.getFullYear() + '-' + monthS + '-' + dayS + ' ' + hourS + ':' + minuteS
  );
}
