const getTimeStart = (time) => {
  switch (time) {
    case 'last12h':
      return Date.now() - 1000 * 60 * 60 * 12;
    case 'last24h':
      return Date.now() - 1000 * 60 * 60 * 24;
    case 'last48h':
      return Date.now() - 1000 * 60 * 60 * 24 * 2;
    case 'last72h':
      return Date.now() - 1000 * 60 * 60 * 24 * 3;
    case 'last1w':
      return Date.now() - 1000 * 60 * 60 * 24 * 7;
    case 'last2w':
      return Date.now() - 1000 * 60 * 60 * 24 * 7 * 2;
    case 'last4w':
      return Date.now() - 1000 * 60 * 60 * 24 * 7 * 4;
    default: return Date.now() - 1000 * 60 * 60 * 24;
  }
};

export default getTimeStart;
