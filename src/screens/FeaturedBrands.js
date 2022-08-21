import React from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Image, Button } from 'react-native';
import { Dimensions } from "react-native";
const screenwidth = Dimensions.get('window').width; //full width;
const screenheight = Dimensions.get('window').height; //full height;
import { useGetBrandsQuery } from '../services/userAuthApi';

const FeaturedBrands=()=> {

  const {data,isLoading,isFetching,error,isSuccess}=useGetBrandsQuery();

  const categorylist = [];

  {isSuccess && data.data.map(brand=>{
            const name=brand.name
            const uuid=brand.uuid
            const image=brand.image
            categorylist.unshift({"name":name,"image":image,"uuid":uuid})

  })}


  // const categorylist = [
    // {
    //   "name": "Medicines",
    //   "image": "https://thumbs.dreamstime.com/b/single-flower-rose-isolated-black-background-close-up-154246141.jpg",
    //   "color": "orange",
    // },
    // {
    //   "name": "Doctors ",
    //   "image": "https://i1.sndcdn.com/artworks-000302448933-06qt88-t500x500.jpg",
    //   "color": "red"
    // },
    // {
    //   "name": "Health product",
    //   "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXQt9Ym2nebK9AXQI6ILVGNFEKHcxAN7-Dng&usqp=CAU",
    //   "color":"cyan"
    // },
    // {
    //   "name": "Diagnostic",
    //   "image": "https://5.imimg.com/data5/TG/TJ/MY-8583111/custard-apple-500x500.jpg",
    //   "color":"green"
    // }, {
    //   "name": "Covid support",
    //   "image": "https://source.unsplash.com/1024x768/?girl",
    //   "color":"blue"
    // }, {
    //   "name": "Health product",
    //   "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXQt9Ym2nebK9AXQI6ILVGNFEKHcxAN7-Dng&usqp=CAU",
    //   "color":"cyan"
    // },
    // {
    //   "name": "Diagnostic",
    //   "image": "https://5.imimg.com/data5/TG/TJ/MY-8583111/custard-apple-500x500.jpg",
    //   "color":"green"
    // }, {
    //   "name": "Covid support",
    //   "image": "https://source.unsplash.com/1024x768/?girl",
    //   "color":"blue"
    // },
  // ];

  return (
      <View style={styles.container}>

        <Text style={styles.categoryText}>Featured Brands</Text>

        <View style={{
          marginTop: 20,
        }}>

<ScrollView horizontal>
{categorylist.map((item,index)=>(
                <View style={styles.catLayout} key={item.uuid}>
                  <View style={styles.imageLayout}>
                    <View style={styles.buttonContainer}>
                      <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                  </View>

                  <Text style={styles.productname}>
                    {item.name != null ? item.name : ""}
                  </Text>
                </View>
    ) 
    )
    }
</ScrollView>


          {/* <FlatList
            data={categorylist}
            keyExtractor={(item, index) => item.tc_id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.catLayout}>
                  <View style={styles.imageLayout}>
                    <View style={styles.buttonContainer}>
                      <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                  </View>

                  <Text style={styles.productname}>
                    {item.name != null ? item.name : ""}
                  </Text>
                </View>
              );
            }}
          /> */}
        </View>
      </View>
  );
};

export default FeaturedBrands;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
  }, catLayout: {
    // width: screenwidth / 4,
    // height: screenheight / 5,
    width:100,
    height:300,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  imageLayout: {
    width: 80,
    height: 80,
  },
  productname: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    margin: 2,
  },
  categoryText: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: 20,
    color: '#000'
  }, 
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    zIndex: 1111,
    width: 200
  }

});
