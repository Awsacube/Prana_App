import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCategoriesQuery} from '../services/userAuthApi';
import {colors} from '../constants/colors';
import adjust from '../utils/responsive';

export default function Categories() {
  const navigation = useNavigation();

  const [userLToken, setUserLToken] = useState();

  const categorylist = [];

  const res = useCategoriesQuery(userLToken);
  if (res.isSuccess === true) {
    const data = res.data.data;

    data.forEach(element => {
      if (element.parent_id === null) {
        const name = element.name;
        const image = element.image;
        const uuid = element.uuid;
        categorylist.unshift({name: name, image: image, uuid: uuid});
      }
    });
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = text => {
    if (text.length > 0) {
      setSearchQuery(text);
      const newCatList = categorylist.filter(category => {
        return Object.values(category)[0]
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      setSearchResults(newCatList);
    } else {
      setSearchResults(categorylist);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.categoryText}>Shop By Category</Text>
          <View style={styles.catLayout}>
            {(searchQuery.length < 1 ? categorylist : searchResults).map(
              (item, index) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate('SubCategories', {id: item.uuid})
                  }
                  key={item.uuid}>
                  <View style={styles.card}>
                    <View style={styles.imageLayout}>
                      <Image source={{uri: item.image}} style={styles.image} />
                    </View>
                    <View style={styles.text}>
                      <Text style={styles.productname}>
                        {item.name != null ? item.name : ''}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ),
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.pearlWhite,
  },
  innerContainer: {},
  catLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop:0
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    // backgroundColor: colors.red,
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    width: adjust(90),
    height: adjust(110),
    margin: adjust(8),
    borderWidth: 1,
    borderColor: colors.gray_400,
    borderRadius: adjust(5),
    padding: adjust(5),
    paddingVertical: adjust(10),
  },
  image: {
    margin: adjust(3),
    width: adjust(50),
    height: adjust(50),
  },
  imageLayout: {
    elevation: 0.5,
    width: adjust(60),
    height: adjust(60),
    borderRadius: adjust(5),
    // borderWidth: 1,
    // borderColor: colors.red,
    backgroundColor: colors.pearlWhite,
  },

  productname: {
    fontSize: adjust(10),
    textAlign: 'justify',
    color: colors.neutralBlack,
    // textAlign: 'center',
    // margin: 2,
    marginTop: adjust(5),
  },
  categoryText: {
    marginLeft: adjust(10),
    marginVertical: adjust(5),
    fontSize: adjust(16),
    color: colors.neutralBlack,
  },
});
