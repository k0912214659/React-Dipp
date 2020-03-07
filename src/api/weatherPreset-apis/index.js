export function CreateWeatherPresetOperationAPI({
  firebase,
}) {
  return {
    getHostWeatherCitySettingList: async () => {
      try {
        const ref = await firebase.database().ref('weather').once('value');
        const data = ref.val();
        if (data) {
          return data;
        }
        return {};
      } catch (error) {
        const errorMessage = { error };
        return errorMessage;
      }
    },
    postHostWeatherCity: async (cityData) => {
      try {
        const ref = firebase.database().ref('weather');
        const result = await ref.push(cityData);
        return result;
      } catch (error) {
        const errorMessage = { error };
        return errorMessage;
      }
    },
    deleteHostWeatherCity: async (cityChildID) => {
      try {
        const ref = firebase.database().ref().child('weather');
        await ref.child(cityChildID).remove();
        return {};
      } catch (error) {
        const errorMessage = { error };
        return errorMessage;
      }
    },
  };
}
