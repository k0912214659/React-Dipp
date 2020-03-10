export const loadImage = (name) => {
  if (name) {
    return require('../../assets/' + name).default;
  }
  return false;
};
