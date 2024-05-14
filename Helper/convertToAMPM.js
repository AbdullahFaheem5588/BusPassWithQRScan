const convertToAMPM = timeString => {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes] = timeString.split(':').map(Number);

  // Create a Date object and set the hours and minutes
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  // Get the hours and minutes in AM/PM format
  const hours12 = date.getHours() % 12 || 12; // Convert 0 to 12
  const ampm = date.getHours() < 12 ? 'AM' : 'PM';

  // Format the time string as "hh:mm AM/PM"
  const timeFormatted = `${hours12}:${String(minutes).padStart(
    2,
    '0',
  )} ${ampm}`;

  return timeFormatted;
};

export default convertToAMPM;
