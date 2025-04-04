import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
};

const Stack = createStackNavigator();

const fetchJobs = async (page: number): Promise<Job[]> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const jobs = Array.from({ length: 10 }, (_, i) => ({
        id: `${page}-${i}`,
        title: `Job Title ${page}-${i}`,
        company: `Company ${page}-${i}`,
        location: `Location ${page}-${i}`,
      }));
      resolve(jobs);
    }, 1000)
  );
};

const JobListScreen = ({ navigation }: any) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const loadBookmarks = async () => {
    const saved = await AsyncStorage.getItem('bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  };

  const saveBookmarks = async (newBookmarks: string[]) => {
    await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  const toggleBookmark = async (jobId: string) => {
    const updated = bookmarks.includes(jobId)
      ? bookmarks.filter((id) => id !== jobId)
      : [...bookmarks, jobId];
    setBookmarks(updated);
    saveBookmarks(updated);
  };

  const loadJobs = async () => {
    if (loading) return;
    setLoading(true);
    const newJobs = await fetchJobs(page);
    setJobs((prev) => [...prev, ...newJobs]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadJobs();
    loadBookmarks();
  }, []);

  const renderItem = ({ item }: { item: Job }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { job: item })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.company}</Text>
      <Text>{item.location}</Text>
      <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
        <Text style={{ color: bookmarks.includes(item.id) ? 'gold' : 'gray' }}>
          {bookmarks.includes(item.id) ? '★ Bookmarked' : '☆ Bookmark'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={loadJobs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
};

const JobDetailsScreen = ({ route }: any) => {
  const { job } = route.params;
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.title}>{job.title}</Text>
      <Text>{job.company}</Text>
      <Text>{job.location}</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Jobs" component={JobListScreen} />
        <Stack.Screen name="Details" component={JobDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  detailContainer: {
    padding: 20,
  },
});
