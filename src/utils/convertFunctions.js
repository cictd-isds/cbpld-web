export function formatDateToYMD(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDateToYMD2(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-CA").format(date); // "yyyy-mm-dd"
}

// converts "Tue Nov 04 2025 00:00:00 GMT+0800 (Philippine Standard Time)" to 2025-11-04
