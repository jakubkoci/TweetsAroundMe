// @flow
import React from 'react'
import { StyleSheet, Text, View, FlatList, Linking } from 'react-native'
import { fetchTrends } from './service'
import type { TrendingTopic } from './types'

type Props = {}

type State = {|
  loading: boolean,
  trends: Array<TrendingTopic>,
|}

export default class TrendingTopics extends React.Component<Props, State> {
  state = {
    loading: false,
    trends: [],
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true })
    try {
      const trends = await fetchTrends()
      this.setState({ loading: false, trends })
    } catch (error) {
      this.setState({ loading: false })
      console.error(error)
    }
  }

  renderItem = (info: { item: TrendingTopic }) => {
    const { item } = info
    return (
      <View style={styles.item}>
        <Text style={styles.itemName} onPress={() => Linking.openURL(item.url)}>
          {item.name}
        </Text>
        {item.tweet_volume && <Text style={styles.itemTweetsVolume}>{item.tweet_volume} tweets</Text>}
      </View>
    )
  }

  render() {
    const { trends, loading } = this.state
    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <View>
        <FlatList data={trends} keyExtractor={({ name }) => name} renderItem={this.renderItem} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 10,
  },
  itemName: {
    color: '#1DA1F2',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  itemTweetsVolume: {
    marginTop: 5,
    color: '#657786',
  },
})
