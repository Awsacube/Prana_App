import { View, Text ,StyleSheet,FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import Search from '../../components/Search'
import HealthConcerns from './HealthConcerns'
import { brandColor } from '../../constants/constants'
import RecentSearches from './RecentSearches'
import Test from './Test'
import { ScrollView } from 'react-native-gesture-handler'


const Diagnostics = () => {
  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor:brandColor}}>
      <Text style={{margin:5}}>100% Safe And Hygiene Indian Most Trusted Labs</Text>
      </View>
      <Search placeholder={"Search For Tests , Health Packages"}/>
      <HealthConcerns/>
      <RecentSearches/>
      <Test/>
    </SafeAreaView>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
  container:{
  //  margin:5
  }
})

export default Diagnostics