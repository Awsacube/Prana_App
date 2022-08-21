import { View, Text ,StyleSheet,FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import Search from '../../components/Search'
import HealthConcerns from './HealthConcerns'
import { brandColor } from '../../constants/constants'
import RecentSearches from './RecentSearches'
import Test from './Test'
import { ScrollView } from 'react-native-gesture-handler'
import PopularPackages from './PopularPackages'
import Underline from 'react-native-textinput-with-icons/lib/Underline'
import { useNavigation } from '@react-navigation/native'


const Diagnostics = () => {
  const navigation=useNavigation();
  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor:'#fff'}}>
      <Text style={{margin:5}}>100% Safe And Hygiene Indian Most Trusted Labs</Text>
      <Text style={styles.viewAll} onPress={()=>navigation.navigate('Test')}>View All Tests</Text>
      </View>
      {/* <AllTestsCard/> */}
      <Search placeholder={"Search For Tests , Health Packages"}/>
      <HealthConcerns/>
      <RecentSearches/>
      <Test/>
      <PopularPackages/>
    </SafeAreaView>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
  container:{
   margin:5
  },

  viewAll:{
      padding:20,
      textDecorationLine: 'underline',

  }

})

export default Diagnostics