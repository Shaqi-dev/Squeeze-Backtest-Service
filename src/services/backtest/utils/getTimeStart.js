const getTimeStart = (time) => {
  switch (time) {
    case '12h':
      return Date.now() - 1000 * 60 * 60 * 12;
    case '24h':
      return Date.now() - 1000 * 60 * 60 * 24;
    case '48h':
      return Date.now() - 1000 * 60 * 60 * 24 * 2;
    case '72h':
      return Date.now() - 1000 * 60 * 60 * 24 * 3;
    case '1w':
      return Date.now() - 1000 * 60 * 60 * 24 * 7;
    case '2w':
      return Date.now() - 1000 * 60 * 60 * 24 * 7 * 2;
    case '4w':
      return Date.now() - 1000 * 60 * 60 * 24 * 7 * 4;
    default: return Date.now() - 1000 * 60 * 60 * 24;
  }
};

export default getTimeStart;
