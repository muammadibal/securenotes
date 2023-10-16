import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface IGap {
    height?: number | undefined
    width?: number | undefined
    flex?: number | undefined
}

const Gap = ({height, width, flex}: IGap) => {
  return (
    <View testID='#myGap' style={{ height, width, flex }}/>
  )
}

export default Gap