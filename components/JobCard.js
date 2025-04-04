import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function JobCard({ job, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{job.title}</Text>
      <Text>{job.location}</Text>
      <Text>Salary: {job.salary}</Text>
      <Text>Phone: {job.phone}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
