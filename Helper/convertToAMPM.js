const convertToAMPM = timeString => {
  if (timeString === null) {
    return '';
  } else {
    const [hours, minutes] = timeString.split(':').map(Number);

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    const hours12 = date.getHours() % 12 || 12;
    const ampm = date.getHours() < 12 ? 'AM' : 'PM';

    const timeFormatted = `${hours12}:${String(minutes).padStart(
      2,
      '0',
    )} ${ampm}`;

    return timeFormatted;
  }
};

export default convertToAMPM;
