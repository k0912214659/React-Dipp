export const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const getIsEmail = (email) => {
  let isEmail = false;
  // eslint-disable-next-line no-useless-escape
  const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexEmail.test(email)) {
    isEmail = true;
  }
  return isEmail;
};
