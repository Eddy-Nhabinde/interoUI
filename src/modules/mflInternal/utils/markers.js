export const marker = (type) => {
  switch (type) {
    case "Centro de Saúde Rural":
      return "marker-rural";
    case "Centro de Saúde Urbano":
      return "marker-urban";
    case "Privado":
      return "marker-private";
    default:
      return "marker-default";
  }
};
