import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { Avatar, HStack, VStack, Pressable } from 'native-base';
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

// Load fonts
Font.loadAsync({
  Akkurat: require('../../fonts/Akkurat.ttf'),
});

const SearchedProduct = (props) => {
  const { productsFiltered = [], navigation } = props; // Assign a default value of an empty array to productsFiltered

  const navigateToProductDetail = (item) => {
    navigation.navigate('Deals', { item: item });
  };

  return (
    <View style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => navigateToProductDetail(item)}
            avatar
          >
            <View>
              <Avatar
                source={{
                  uri: item.image
                }}
              />
            </View>
            <View>
              <Text style={styles.productName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: 'center' }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  productName: {
    fontFamily: 'Akkurat',
    color: 'white'
  },
});

export default SearchedProduct;
