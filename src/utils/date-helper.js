const today = new Date();
const thisMonth = today.getMonth() + 1;

function formattedDate(today, dash = "-") {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return [year, month, date].join(dash);
}

const firstDay = formattedDate(
  new Date(today.getFullYear(), today.getMonth(), 1)
);
const lastDay = formattedDate(
  new Date(today.getFullYear(), today.getMonth() + 1, 0)
);

export const DateHelper = {
  firstDay,
  lastDay,
  thisMonth,
};
