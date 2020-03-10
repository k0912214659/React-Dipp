export function CreateUserOperationAPI({
  firebase,
}) {
  return {
    getUserSession: async () => (
      new Promise((resolve, reject) => {
        try {
          firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
              const userData = await firebase.database().ref(`user/${user.uid}`).once('value');
              resolve(userData.val());
            } else {
              resolve({
                identity: 'guest',
              });
            }
          });
        } catch (error) {
          const errorMessage = {
            error: error.response.data,
          };
          reject(errorMessage);
        }
      })
    ),
    postUserSession: async (email, password) => (
      new Promise((resolve, reject) => {
        try {
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
          firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            const errorMessage = {
              error,
            };
            resolve(errorMessage);
          });
          firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
              const userData = await firebase.database().ref(`user/${user.uid}`).once('value');
              resolve(userData.val());
            }
          });
        } catch (error) {
          reject(error);
        }
      })
    ),
    deleteUserSession: async () => (
      new Promise((resolve, reject) => {
        try {
          firebase.auth().signOut();
          firebase.auth().onAuthStateChanged(() => {
            resolve({});
          });
        } catch (error) {
          const errorMessage = {
            error: error.response.data,
          };
          reject(errorMessage);
        }
      })
    ),
  };
}
