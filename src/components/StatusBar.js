// @flow
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import type { Position } from '../types'

type Props = {
  loading: boolean,
  error: ?string,
  position: Position,
  onReloadClick: () => Promise<void>,
}

export default function StatusBar({ loading, error, position, onReloadClick }: Props) {
  return (
    <View style={styles.container}>
      <StatusBarLoader loading={loading}>
        <StatusBarContent error={error} position={position} onReloadClick={onReloadClick} />
      </StatusBarLoader>
    </View>
  )
}

function StatusBarLoader({ loading, children }) {
  if (loading) {
    return <Text>Loading...</Text>
  }
  return children
}

function StatusBarContent({ error, position, onReloadClick }) {
  return (
    <View style={styles.content}>
      {error ? (
        <View style={{ flex: 1 }}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <View>
          <Text>Lat: {position.coordinates.latitude}</Text>
          <Text>Lng: {position.coordinates.longitude}</Text>
        </View>
      )}

      <Button title="Reload" color="#841584" accessibilityLabel="Reload" onPress={onReloadClick} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: '#ccc',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  error: {
    color: 'red',
  },
})
