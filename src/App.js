// @flow
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TrendingTopics from './TrendingTopics'

export default function App() {
  return (
    <View>
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
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
})
