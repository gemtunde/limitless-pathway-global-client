// export const formatDate = (dateStr: string) => {
//   const date = new Date(dateStr);
//   const dd = String(date.getDate()).padStart(2, "0");
//   const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
//   const yyyy = date.getFullYear();
//   return `${dd}/${mm}/${yyyy}`;
// };
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const day = date.getDate();
  const year = date.getFullYear();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];

  return `${day} ${month} ${year}`;
};
