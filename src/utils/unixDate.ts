// Get the current date in UTC
export const getUnixDate = (date: Date | string | number): number => {
  const newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0, 0); // Set to midnight UTC

  return newDate.getTime(); // Timestamp in UTC
};
