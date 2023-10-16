import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, RefreshControl, Alert, BackHandler } from 'react-native'
import React, { useCallback, useState } from 'react'
import { radius, shadow, spacing } from '../../utils/theme'
import Button from '../../components/Button'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { RootParamList } from '../../routes'
import { storage } from '../../utils/storage'
import LottieView from 'lottie-react-native'
import Gap from '../../components/Gap'

const Dashboard = () => {
  const navigation = useNavigation<RootParamList>()
  const { height, width }= Dimensions.get("window")
  const [notes, setNotes] = useState<string[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

  useFocusEffect(useCallback(
    () => {
      onRefresh()

      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to logout?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Landing' }],
          }) }
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    },
    [],
  ))

  const onRefresh = () => {
    const jsonNotes = storage.getString('notes')

    if(jsonNotes) {
      const notesObject = JSON.parse(jsonNotes)
      setNotes(notesObject)//.reverse())
    }
    setRefreshing(false)
  }

  const TileItem = ({item, index}: {item: string, index: number}) => {
    return <TouchableOpacity key={index} onPress={() => {
      navigation.navigate("Post", {noteValue: item, index, notes})
    }} style={[shadow, {
        padding: spacing,
        borderRadius: radius,
        backgroundColor: "white",
        marginTop: index === 0 ? spacing : 0,
        marginBottom: spacing,
        flexDirection: "row",
        justifyContent: 'space-between'
      }]}>
        <Text style={{ width: "90%", color: "black" }}>{item}</Text>
        <TouchableOpacity onPress={() => {
          Alert.alert("Hold on!", "Are you sure you want delete this?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => {
              const newValue = notes.filter((v) => v !== item)
              storage.set("notes", JSON.stringify(newValue))
              setNotes(newValue)
            } }
          ]);
        }} style={{ 
          borderWidth: 2,
          borderColor: "red",
          width: 25,
          height: 25,
          borderRadius: 25,
          alignItems:'center',
          justifyContent:'center'
        }}>
          <Text style={{ color: "red", fontSize: 10, top: -1, fontWeight: "bold" }}>x</Text>
        </TouchableOpacity>
    </TouchableOpacity>
  }

  const EmptyItem = () => {
    return <LottieView style={{ height: height *.8, backgroundColor: "gren" }} source={require("../../assets/images/ic_empty.json")} autoPlay loop />
  }

  return (
    <View style={{ flex:1, marginHorizontal: 16 }}>
      {notes?.length === 0 ? <EmptyItem /> : <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            progressViewOffset={-10}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true)
              setTimeout(() => {
                onRefresh()
              }, 2000);
            }}
            colors={["#3FAFFF"]}
          />
        }>
          {notes?.map((item, index) => {
            return <TileItem item={item} index={index} />
          })}
          <Gap height={120}/>
        </ScrollView>
      }

    <Button onPress={() => navigation.navigate("Post")} title='Add new note' styles={{
      position: "absolute",
      bottom: 3 * spacing,
      width: 140,
      left: (width / 2) - (140 / 2) - 16
    }}/>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})