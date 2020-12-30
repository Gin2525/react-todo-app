function convertDateToUnix(date: Date): number {
  return Math.round(date.getTime() / 100); //return unix_time
}

export const genKey = () => {
  return convertDateToUnix(new Date());
};
