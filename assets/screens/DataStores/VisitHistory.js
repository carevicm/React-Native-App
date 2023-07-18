import AsyncStorage from "@react-native-async-storage/async-storage";

const saveVisitHistory = async (visitHistory) => {
  try {
    const jsonVisitHistory = JSON.stringify(visitHistory);
    await AsyncStorage.setItem('visitHistory', jsonVisitHistory);
    console.log('Visit history saved successfully.');
  } catch (error) {
    console.log('Error saving visit history:', error);
  }
};

const loadVisitHistory = async () => {
  try {
    const jsonVisitHistory = await AsyncStorage.getItem('visitHistory');
    if (jsonVisitHistory !== null) {
      const visitHistory = JSON.parse(jsonVisitHistory);
      console.log('Visit history loaded successfully.');
      return visitHistory;
    } else {
      console.log('No visit history found.');
      return [];
    }
  } catch (error) {
    console.log('Error loading visit history:', error);
    return [];
  }
};

export { saveVisitHistory, loadVisitHistory };
