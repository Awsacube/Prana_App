import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import Search from '../../components/Search';
import HealthConcerns from './HealthConcerns';
// import {brandColor} from '../../constants/constants';
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
import adjust from '../../utils/responsive';
import {colors} from '../../constants/colors';

const Diagnostics = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Search
        placeholder={'Search For Tests , Health Packages'}
        editable={false}
        navigate="EmptyPage"
        component={<DiagSearch />}
      />
      <View style={styles.mainContainer}>
        <Location style={styles.location} />
        <View>
          <Calltoorder text={'Book a Test'} />
        </View>
      </View>
      <Text style={styles.header}>
        100% Safe And Hygiene Indian Most Trusted Labs
      </Text>

      {/* <HealthConcerns /> */}
      {/* <OrganList /> */}
      {/* <RecentSearches/> */}
      {/* <Test /> */}
      <Text
        style={styles.viewAll}
        onPress={() => navigation.navigate('AllTests')}>
        View All Tests
      </Text>
      <AllTests />
      {/* <PopularPackages /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearlWhite,
    paddingVertical: adjust(5),
    // paddingHorizontal: adjust(5),
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: adjust(10),
    marginHorizontal: adjust(5),
    // backgroundColor: colors.pearlWhite,
  },
  header: {
    textAlign: 'center',
    fontSize: adjust(12),
    color: colors.neutralBlack,
    marginVertical: adjust(5),
  },

  viewAll: {
    backgroundColor: colors.pearlWhite,
    marginHorizontal: adjust(5),
    marginVertical: adjust(5),
    paddingVertical: adjust(5),
    textAlign: 'center',
    borderRadius: adjust(5),
    borderWidth: 1,
    borderColor: colors.azureBlue,
    color: colors.azureBlue,
    fontSize: adjust(14),
    fontWeight: '500',
  },
});

export default Diagnostics;
