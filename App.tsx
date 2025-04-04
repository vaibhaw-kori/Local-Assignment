import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobsScreen from './screens/JobsScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabScreens = () => (
  <Tab.Navigator>
    <Tab.Screen name="Jobs" component={JobsScreen} />
    <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabScreens} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={JobDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
