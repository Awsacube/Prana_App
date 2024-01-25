import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  StatusBar,
  Animated,
  ImageBackground,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {Icon} from 'react-native-eva-icons';
import {LinearGradient} from 'expo-linear-gradient';

import data from '../../data/data';
import {Colors} from '../../constants/colors';
import {widthToDp, heightToDp, width, height} from '../../constants/theme';

const LOGO_WIDTH = widthToDp('50%');
const LOGO_HEIGHT = heightToDp('10%');
const DOT_SIZE = widthToDp('10%');
const TICKER_HEIGHT = widthToDp('10%');
const CIRCLE_SIZE = width * 0.68;

const Circle = ({scrollX}) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({color}, index) => {
        const inputRange = [
          (index - 0.5) * width,
          index * width,
          (index + 0.5) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 2, 0],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.7, 0],
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                transform: [{scale}],
                opacity,
                backgroundColor: color,
              },
            ]}
          ></Animated.View>
        );
      })}
    </View>
  );
};

const Ticker = ({scrollX}) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{transform: [{translateY}]}}>
        {data.map(({type}, index) => {
          return (
            <Text style={styles.tickerText} key={index}>
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const Item = ({imageUri, heading, description, index, scrollX}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const inputRangeOpacity = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });

  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.7, 0, -width * 0.7],
  });

  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.itemStyle}>
      <Animated.Image
        source={imageUri}
        style={[
          styles.imageStyle,
          {
            transform: [{scale}],
          },
        ]}
      />
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
              transform: [{translateX: translateXHeading}],
            },
          ]}
        >
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              transform: [{translateX: translateXDescription}],
            },
          ]}
        >
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

const Pagination = ({scrollX}) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE],
  });
  return (
    <View style={styles.pagination}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            transform: [{translateX}],
            position: 'absolute',
          },
        ]}
      />
      {data.map(item => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View
              style={[styles.paginationDot, {backgroundColor: item.color}]}
            />
          </View>
        );
      })}
    </View>
  );
};

const Onboarding = ({navigation, route}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        style={styles.bgContainer}
        source={require('../assets/onboar.png')}
        resizeMode="cover"
      >
        <Circle scrollX={scrollX} />
        <Animated.FlatList
          style={{marginTop: heightToDp('15%')}}
          keyExtractor={item => item.key.toString()}
          data={data}
          renderItem={({item, index}) => (
            <Item {...item} index={index} scrollX={scrollX} />
          )}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {x: scrollX}},
              },
            ],
            {
              useNativeDriver: true,
            },
          )}
          scrollEventThrottle={16}
        />
        <Pagination scrollX={scrollX} />
        {/* <Ticker scrollX={scrollX} /> */}

        <View style={styles.closeContainer}>
          <TouchableRipple
            onPress={() => navigation.navigate('SignIn')}
            rippleColor={Colors.rippleColor}
            style={{justifyContent: 'center', alignItems: 'center'}}
          >
            <Icon
              name="close-circle"
              width={widthToDp('15%')}
              height={widthToDp('15%')}
              fill="#f7f1e3"
            />
          </TouchableRipple>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171b2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width < 400 ? width * 0.65 : width * 0.85,
    height: width < 400 ? width * 0.65 : width * 0.85,
    resizeMode: 'contain',
    flex: 1,
  },
  textContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    flex: 0.5,
    marginBottom: height < 600 ? heightToDp('26%') : heightToDp('28%'),
  },
  heading: {
    color: '#f7f1e3',
    textTransform: 'uppercase',
    fontSize: width < 400 ? widthToDp('3%') : widthToDp('5%'),
    fontFamily: 'SemiBold',
    marginBottom: widthToDp(3),
  },
  description: {
    color: '#4b4b4b',
    fontFamily: 'Regular',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: widthToDp(2),
    fontSize: width < 400 ? widthToDp('3%') : widthToDp('4%'),
    color: '#aaa69d',
    lineHeight: width < 400 ? heightToDp('3%') * 1.5 : heightToDp('4%') * 1.5,
  },
  logo: {
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: 'contain',
    position: 'absolute',
    left: widthToDp('4%'),
    bottom: heightToDp('8%'),
    transform: [
      {translateX: -LOGO_WIDTH / 2},
      {translateY: -LOGO_HEIGHT / 2},
      {rotateZ: '-90deg'},
      {translateX: LOGO_WIDTH / 2},
      {translateY: LOGO_HEIGHT / 2},
    ],
  },
  pagination: {
    position: 'absolute',
    bottom: height < 600 ? heightToDp('20%') : heightToDp('28%'),
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  tickerContainer: {
    position: 'absolute',
    top: 50,
    left: widthToDp('10%'),
    overflow: 'hidden',
    height: height < 400 ? heightToDp('7%') : heightToDp('8%'),
  },
  tickerText: {
    fontSize: width < 400 ? widthToDp('4%') : widthToDp('6%'),
    lineHeight: width < 400 ? widthToDp('7.5%') : widthToDp('11.5%'),
    fontFamily: 'ExtraBold',
    color: 'white',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '15%',
  },
  closeContainer: {
    position: 'absolute',
    bottom: height < 600 ? heightToDp('3%') : heightToDp('8%'),
    overflow: 'hidden',
    width: widthToDp('15%'),
    height: widthToDp('15%'),
    borderRadius: widthToDp(25),
  },
  bgContainer: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Onboarding;
