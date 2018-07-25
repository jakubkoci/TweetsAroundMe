// @flow
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fetchTrends } from './service'

type Props = {}

export default class App extends React.Component<Props> {
  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const trends = await fetchTrends()
    console.log(trends)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Tweets Around Me!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
