export const getHostApiURL = (env) => {
  switch (env) {
    case 'dev':
    case 'production':
    default:
      return 'https://marketing.withdipp.com/';
  }
};
export const getHostURL = (env) => {
  switch (env) {
    case 'dev':
    case 'production':
    default:
      return 'https://marketing.withdipp.com/';
  }
};
