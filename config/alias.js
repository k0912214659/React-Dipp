const path = require('path');

module.exports = {
  '@Base': path.resolve(__dirname, '..', 'src', 'base'),
  '@Components': path.resolve(__dirname, '..', 'src', 'components'),
  '@Reducers': path.resolve(__dirname, '..', 'src', 'reducers'),
  '@API': path.resolve(__dirname, '..', 'src', 'api'),
  '@Images': path.resolve(__dirname, '..', 'src', 'image-loader'),
  '@Tools': path.resolve(__dirname, '..', 'src', 'tools'),
  '@Hooks': path.resolve(__dirname, '..', 'src', 'hooks'),
  '@Service': path.resolve(__dirname, '..', 'src', 'service'),
  '@Models': path.resolve(__dirname, '..', 'src', 'models'),
  '@CSS': path.resolve(__dirname, '..', 'src', 'css'),
  '@Langs': path.resolve(__dirname, '..', 'src', 'langs')
};
