// @flow
export type TrendingTopic = {
  name: string,
  url: string,
  tweet_volume: ?number,
}

export type Position = {
  coordinates: {
    latitude: number,
    longitude: number,
  },
}

export type TrendsData = {
  trends: Array<TrendingTopic>,
  position: Position,
}
