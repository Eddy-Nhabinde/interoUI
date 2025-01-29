export function hasNull(target) {
  for (var member in target) {
      if (!target[member] || target[member] === "Sem codigo")
          return true;
  }
  return false;
}

