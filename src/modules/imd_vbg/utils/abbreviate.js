export const abbreviate = (label) => {
  var initials = "";
  var names = label.split(" ");
  names = names.filter((e) => e !== "de");

  if (names.length === 1) return names;

  if (names.length > 2) {
    initials += names[0].substring(0, 1).toUpperCase() + ". ";
    initials += names[1].substring(0, 1).toUpperCase() + ". ";
    names.splice(0, 2);
  } else {
    initials += names[0].substring(0, 1).toUpperCase() + ". ";
    names.shift();
  }

  if (names.length) {
    for (const i of names) {
      initials += i + " ";
    }
  }
  return initials;
};
