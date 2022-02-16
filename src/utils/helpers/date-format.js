export const postDateFormat = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date1 = new Date(date);
  const date2 = Date.now();
  const diffTime = Math.abs(date2 - date1);
  const diffHour = Math.round(diffTime / (1000 * 60 * 60));
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (!diffDays) {
    if (!diffHour) {
      return "Now";
    }
    return diffHour + " h.";
  } else if (diffDays === 1) {
    return `Yesterday ${date1.getHours()}:${date1.getMinutes()}`;
  } else if (diffDays < 10) {
    return `${date1.getDay()}. ${monthNames[date1.getMonth()]} kl.${date1.getHours()}:${date1.getMinutes()}`;
  } else {
    return diffDays + " d.";
  }
};
