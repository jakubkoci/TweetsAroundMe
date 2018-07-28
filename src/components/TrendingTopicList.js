// @flow
import React from 'react'
import { StyleSheet, Text, View, FlatList, Linking } from 'react-native'
import type { TrendingTopic } from '../types'

type Props = {
  trendingTopics: Array<TrendingTopic>,
}

export default function TrendingTopicList({ trendingTopics }: Props) {
  return (
    <FlatList
      data={trendingTopics}
      keyExtractor={({ name }) => name}
      renderItem={({ item }) => <TrendingTopicItem item={item} />}
    />
  )
}

function TrendingTopicItem({ item }: { item: TrendingTopic }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemName} onPress={() => Linking.openURL(item.url)}>
        {item.name}
      </Text>
      {item.tweet_volume && <Text style={styles.itemTweetsVolume}>{item.tweet_volume} tweets</Text>}
    </View>
  )
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
