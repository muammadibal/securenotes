import React, { useCallback, useState } from 'react'
import { Alert, StyleSheet, TextInput, View } from 'react-native'
import Button from '../../components/Button'
import { radius, shadow, spacing } from '../../utils/theme'
import Gap from '../../components/Gap'
import { storage } from '../../utils/storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { RootParamList } from '../../routes'

const Post = ({route}: any) => {
  const navigation = useNavigation<RootParamList>()
  const {noteValue, notes, index} = route?.params
  const [note, setNote] = useState<string>('')

  useFocusEffect(useCallback(
    () => {
      if(noteValue) setNote(noteValue)
    },
    [noteValue],
  )
  )

  return (
    <View style={{ 
      flex:1,
      marginHorizontal: spacing
     }}>

      <TextInput testID='#myInput' onChangeText={(e) => setNote(e)} value={note} style={[shadow, {
        height: 100,
        backgroundColor: 'white',
        borderRadius: radius,
        marginVertical: spacing,
        padding: spacing,
        paddingTop: spacing,
        color: "black",
      }]} 
      autoFocus
      placeholder='Write note here...'
      placeholderTextColor="black"
      numberOfLines={3}
      multiline
      textAlignVertical='top'
      textAlign='left'/>

      <View style={{ flexDirection: "row" }}>
        <Gap flex={1}/>
        <Button onPress={() => {
          if(note?.length > 0) {
            if(noteValue) {
              notes[index] = note
              storage.set("notes", JSON.stringify(notes))
            } else {
              const jsonNotes = storage.getString('notes')

              if(jsonNotes) {
                const notesObject = JSON.parse(jsonNotes)
                storage.set("notes", JSON.stringify([...notesObject, note]))
              } else {
                storage.set("notes", JSON.stringify([note]))
              }
            }
            setNote("")
            navigation.goBack()

          } else {
            Alert.alert("Information!", "Input the field")
          }
        }} title='Save' styles={{
          width: 100
        }}/>
      </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({})