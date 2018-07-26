// @flow
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TrendingTopics from './TrendingTopics'

export default function App() {
  return (
    <View style={styles.container}>
      <Header>Trends Around Me</Header>
      <TrendingTopics />
    </View>
  )
}

function Header({ children }) {
  return (
    <View>
      <Text style={styles.headerText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
})
