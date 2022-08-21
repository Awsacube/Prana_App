import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const CarouselItem = ({ item }) => {

    console.log("Width",width-20)

    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={item.url} onPress={item.onPress}/>
            {/* <View style={styles.textView}>
                <Text style={styles.itemTitle}> {item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {

        width: width - 20,
        height: height / 4,
        backgroundColor: 'black',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    // textView: {
    //     position: 'absolute',
    //     bottom: 10,
    //     margin: 10,
    //     left: 5,
    // },
    image: {
        // width: width-40,
        // height: height / 10,
        borderRadius: 10,
        resizeMode: 'stretch',
        width: undefined,
        height: undefined,
        flex:1
        // padding:5
    },
    // itemTitle: {
    //     color: 'white',
    //     fontSize: 22,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0.8, height: 0.8 },
    //     shadowOpacity: 1,
    //     shadowRadius: 3,
    //     marginBottom: 5,
    //     fontWeight: "bold",
    //     elevation: 5
    // // },
    // itemDescription: {
    //     color: 'white',
    //     fontSize: 12,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0.8, height: 0.8 },
    //     shadowOpacity: 1,
    //     shadowRadius: 3,
    //     elevation: 5
    // }
})

export default CarouselItem