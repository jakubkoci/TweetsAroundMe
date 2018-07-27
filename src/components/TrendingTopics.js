// @flow
import React from 'react'
import { StyleSheet, Text, View, FlatList, Linking } from 'react-native'
import StatusBar from './StatusBar'
import { fetchTrends } from '../trends'
import type { TrendingTopic } from '../types'

type Props = {}

type State = {|
  loading: boolean,
  error: ?string,
  data: {|
    position: any,
    trends: Array<TrendingTopic>,
  |},
|}

const initialState = {
  loading: false,
  error: null,
  data: {
    position: {
      coordinates: {},
    },
    trends: [],
  },
}

export default class TrendingTopics extends React.Component<Props, State> {
  state = initialState

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true, data: { ...initialState.data } })
    try {
      const data = await fetchTrends()
      this.setState({ loading: false, data })
    } catch (error) {
      this.setState({ loading: false, error: 'Something went wrong! Try to reload, please.' })
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
    const { loading, error, data } = this.state
    const { trends, position } = data

    return (
      <View style={styles.container}>
        <StatusBar loading={loading} error={error} position={position} onReloadClick={() => this.fetchData()} />
        <FlatList data={trends} keyExtractor={({ name }) => name} renderItem={this.renderItem} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
