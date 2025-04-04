import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import JobCard from '../components/JobCard';
import { useNavigation } from '@react-navigation/native';

export default function JobsScreen() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();

  const fetchJobs = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setJobs(prev => [...prev, ...res.data]);
        setPage(page + 1);
      }
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <JobCard job={item} onPress={() => navigation.navigate('Details', { job: item })} />
      )}
      onEndReached={fetchJobs}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading && <ActivityIndicator size="large" />}
    />
  );
}
