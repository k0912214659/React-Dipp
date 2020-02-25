export const getApiDelay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});
