// @flow
import React from 'react'
import { StyleSheet, View } from 'react-native'
import StatusBar from './StatusBar'
import TrendingTopicList from './TrendingTopicList'
import { fetchTrends } from '../trends'
import type { TrendsData } from '../types'

type Props = {}

type State = {|
  loading: boolean,
  error: ?string,
  data: TrendsData,
|}

const initialState = {
  loading: false,
  error: null,
  data: {
    position: {
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    },
    trends: [],
  },
}

export default class TrendingTopics extends React.Component<Props, State> {
  state = initialState

  componentDidMount(): void {
    this.fetchData()
  }

  fetchData = async (): Promise<void> => {
    this.setState({ loading: true, data: { ...initialState.data } })
    try {
      const data = await fetchTrends()
      this.setState({ loading: false, data })
    } catch (error) {
      this.setState({ loading: false, error: 'Something went wrong! Try to reload, please.' })
    }
  }

  render() {
    const { loading, error, data } = this.state
    const { trends, position } = data

    return (
      <View style={styles.container}>
        <StatusBar loading={loading} error={error} position={position} onReloadClick={() => this.fetchData()} />
        <TrendingTopicList trendingTopics={trends} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
