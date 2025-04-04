import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveBookmark = async (job) => {
  try {
    const json = await AsyncStorage.getItem('bookmarks');
    const bookmarks = json != null ? JSON.parse(json) : [];
    const exists = bookmarks.find(j => j.id === job.id);
    if (!exists) {
      bookmarks.push(job);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  } catch (err) {
    console.error('Error saving bookmark:', err);
  }
};

export const getBookmarks = async () => {
  try {
    const json = await AsyncStorage.getItem('bookmarks');
    return json != null ? JSON.parse(json) : [];
  } catch (err) {
    console.error('Error loading bookmarks:', err);
    return [];
  }
};
