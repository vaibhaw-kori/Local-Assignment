import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import JobCard from '../components/JobCard';
import { getBookmarks } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetch = async () => {
      const data = await getBookmarks();
      setBookmarks(data);
    };
    const unsubscribe = navigation.addListener('focus', fetch);
    return unsubscribe;
  }, [navigation]);

  return (
    <FlatList
      data={bookmarks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <JobCard job={item} onPress={() => navigation.navigate('Details', { job: item })} />
      )}
      ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No bookmarks found</Text>}
    />
  );
}
