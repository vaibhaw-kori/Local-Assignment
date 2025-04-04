import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { saveBookmark } from '../utils/storage';

export default function JobDetailsScreen({ route }) {
  const { job } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text>Location: {job.location}</Text>
      <Text>Salary: {job.salary}</Text>
      <Text>Phone: {job.phone}</Text>
      <Text>Description: {job.description}</Text>
      <Button title="Bookmark" onPress={() => saveBookmark(job)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
