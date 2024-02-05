import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import Search from '../../components/Search';
import HealthConcerns from './HealthConcerns';
import {brandColor} from '../../constants/constants';
import RecentSearches from './RecentSearches';
import Test from './Test';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import PopularPackages from './PopularPackages';
import Underline from 'react-native-textinput-with-icons/lib/Underline';
import {useNavigation} from '@react-navigation/native';
import DiagSearch from './DiagSearch';
import AllTests from './AllTests';
import OrganList from './OrgansList';
import Calltoorder from '../Calltoorder';
import Location from '../Location';

const Diagnostics = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Location />
          <Calltoorder text={'Book a Test'} />
          <Text style={{margin: 5}}>
            100% Safe And Hygiene Indian Most Trusted Labs
          </Text>
          <Text
            style={styles.viewAll}
            onPress={() => navigation.navigate('AllTests')}>
            View All Tests
          </Text>
        </View>
        <Search
          placeholder={'Search For Tests , Health Packages'}
          editable={false}
          navigate="EmptyPage"
          component={<DiagSearch />}
        />
        <HealthConcerns />
        <OrganList />
        {/* <RecentSearches/> */}
        {/* <Test/> */}
        {/* <AllTests/> */}
        {/* <PopularPackages/>  */}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },

  viewAll: {
    padding: 20,
    textDecorationLine: 'underline',
  },
});

export default Diagnostics;
