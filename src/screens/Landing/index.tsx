import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { RootParamList } from '../../routes'
import FingerprintScanner from 'react-native-fingerprint-scanner'

const Landing = () => {
  const navigation = useNavigation<RootParamList>()
  
  return (
    <View style={{ 
      flex:1, 
      alignItems:'center', 
      justifyContent:'center'
     }}>
      <Button title='Authenticate' type='primary' onPress={async () => {
        FingerprintScanner.isSensorAvailable()
        .then(() => {
            FingerprintScanner
              .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
              .then(() => {
                FingerprintScanner.release();
                navigation.navigate("Dashboard");
              })
              .catch((error) => {
                Alert.alert('Information!', error.message, [
                  { text: "OK", onPress: () => FingerprintScanner.release()}
                ])
              });
          })
          .catch((error) => {
            Alert.alert('Information!', error.message, [
              { text: "OK", onPress: () => FingerprintScanner.release() }
            ])
          });
      }}/>
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({})