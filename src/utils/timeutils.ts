export function formatDate(date: Date) {
  const year = date.getFullYear();
  let month: string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();
  let hours: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
