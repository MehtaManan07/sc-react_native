export const timee = (item: any) => {
  function between(x, min, max) {
    return x >= min && x <= max;
  }
  let today = new Date();
  let Christmas = new Date(item);
  // @ts-ignore
  let diffMin = (today - Christmas) / 60000;
  if (diffMin < 1) {
    return 'Just now';
  } else if (between(diffMin, 1, 60)) {
    return `${diffMin}m`;
  } else if (between(diffMin, 60, 1440)) {
    return `${diffMin / 60}h`;
  } else {
    return `${diffMin / 1440}d`;
  }
};


export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

