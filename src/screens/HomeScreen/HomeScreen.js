import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from '../../components/Search';
import Categories from '../Categories';
import FeaturedBrands from '../FeaturedBrands';
import Logo from '../../assets/LOGO.png';
import Services from '../Services';
import Calltoorder from '../Calltoorder';
import Specialization from '../Doctors/Specialization';
import Location from '../Location';
import ProductSearch from './ProductSearch';
import adjust from '../../utils/responsive';
import {colors} from '../../constants/colors';

const HomeScreen = ({navigation}) => {
  const [placeholder, setPlaceholder] = useState('Search For Crocin');
  useEffect(() => {
    const interval = setInterval(() => {
      const placeholderOptions = [
        'Serach for Crocin',
        'Search For Dolo',
        'Search For Diapers',
      ];
      const randomIndex = Math.floor(Math.random() * placeholderOptions.length);
      setPlaceholder(placeholderOptions[randomIndex]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const gotocart = () => {
    navigation.navigate('CartContainer');
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.Header}>
        <View>
          <Image source={Logo} style={styles.Logo} />
        </View>
        <View>
          <TouchableOpacity onPress={gotocart}>
            <Icon name="shopping-cart" color="#E73631" size={35} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.mainContainer}>
            <Location style={styles.location} />
            <View>
              <Calltoorder text={'Book a Test'} />
            </View>
          </View>
          <Search
            placeholder={placeholder}
            editable={false}
            navigate="EmptyPage"
            component={<ProductSearch />}
          />
        </View>
        <Services />
        <Specialization />
        <FeaturedBrands />
        <Categories />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Header: {
    marginTop: 7,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
  },
  mainContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: adjust(10),
    marginHorizontal: adjust(5),
    // backgroundColor: colors.pearlWhite,
  },
  Logo: {
    width: 150,
    height: 50,
  },
  location: {
    // padding: adjust(10),
    backgroundColor: colors.red,
    marginTop: adjust(50),
  },
  safeview: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomeScreen;
