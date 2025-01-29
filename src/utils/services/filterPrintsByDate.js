// TODO @Celso -- RENAME THE FILE - CHANGE FOLDER TO SERVICE -- In a near future you won't need this (this processo MUST be done at API side) and looks like there's a better way to deal with dates!

const week = () => {
  var date = new Date();
  var firstDay = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
  var lastDay = firstDay + 6; // last day is the first day + 6
  var first = new Date(date.setDate(firstDay)).toISOString().substring(0, 10);
  var last = new Date(date.setDate(lastDay)).toISOString().substring(0, 10);

  return {
    firtDay: () => first,
    lastDay: () => last,
  };
};

const month = () => {
  var firstDay = new Date(new Date().getFullYear(), new Date().getMonth() - 1, (new Date().getDate() + 1))
    .toISOString()
    .substring(0, 10)
  var lastDay = new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate() + 1)).toISOString().substring(0, 10);
  return {
    firstDay: () => firstDay,
    lastDay: () => lastDay,
  };
};

const oneMonth = () => {
  var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  let d = date.getDate();

  var firstDay = new Date(y, m - 1, d + 1).toISOString().substring(0, 10);
  var lastDay = new Date(y, m, d + 1).toISOString().substring(0, 10);

  return {
    firstDay: () => firstDay,
    lastDay: () => lastDay,
  };
};

const year = () => {
  var currentDate = new Date();
  var theFirst = new Date(currentDate.getFullYear(), 0, 2).toISOString().substring(0, 10);
  var theLast = new Date(currentDate.getFullYear(), 11, 32).toISOString().substring(0, 10);
  return {
    firstDate: () => theFirst,
    lastDate: () => theLast
  }
};

const yesterday = () => {
  return new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().substring(0, 10);
}

export { week, month, year, yesterday, oneMonth };
