import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { radius, spacing } from '../utils/theme'

interface IButton {
    title: String
    type?: 'primary' | 'secondary'
    styles?: StyleProp<ViewStyle>
    onPress: ((event: GestureResponderEvent) => void) | undefined
}
const Button = ({title, type = 'primary', onPress, styles}: IButton) => {
    const choosenType = () => {
        switch (type) {
            case 'primary':
                return {
                    backgroundColor: "#3FAFFF",
                    color: "white"
                }
                break;
                case 'secondary':
                return {
                    backgroundColor: "#FFFFFF",
                    color: "black"
                }
                break;
            default:
                return {
                    backgroundColor: "#3FAFFF",
                    color: "white"
                }
                break;
        }
    }

  return (
    <TouchableOpacity testID='#myButton' onPress={onPress} style={[choosenType(), { alignItems:'center',
     padding: spacing, borderRadius: radius }, styles]}>
        <Text style={{ 
            textAlign: "justify",
            color: choosenType().color
         }}>{title}</Text>
      </TouchableOpacity>
  )
}

export default Button