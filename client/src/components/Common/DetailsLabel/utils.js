export const TYPES = {
  expences: 'EXPENCES',
  duration: 'DURATION',
  rating: 'RATING',
};

const colors = {
  veryGood: '#00B300',
  good: '#7FBB17',
  ok: '#FEC22D',
  bad: '#F47048',
  veryBad: '#E91E63',
};

const limitsExpences = [100, 500, 1000, 5000];
const limitsDuration = [2, 7, 14, 31];
const limitsRating = [1, 2, 3, 4];

const getColorsInversed = (value, limits) => {
  switch (true) {
    case value > limits[3]:
      return colors.veryBad;
    case value > limits[2]:
      return colors.bad;
    case value > limits[1]:
      return colors.ok;
    case value > limits[0]:
      return colors.good;
    default:
      return colors.veryGood;
  }
};

const getColorsDirect = (value, limits) => {
  switch (true) {
    case value > limits[3]:
      return colors.veryGood;
    case value > limits[2]:
      return colors.good;
    case value > limits[1]:
      return colors.ok;
    case value > limits[0]:
      return colors.bad;
    default:
      return colors.veryBad;
  }
};

const getFunctionByType = {
  [TYPES.expences]: value => getColorsInversed(value, limitsExpences),
  [TYPES.duration]: value => getColorsDirect(value, limitsDuration),
  [TYPES.rating]: value => getColorsDirect(value, limitsRating),
};

export const getColorsByTypeAndValue = (type, value) => getFunctionByType[type](value);
