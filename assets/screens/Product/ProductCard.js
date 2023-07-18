import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Font from 'expo-font';

var { width } = Dimensions.get('window');

// Load fonts
Font.loadAsync({
  Akkurat: require('../../fonts/Akkurat.ttf'),
});

const ProductCard = (props) => {
  const { name, image } = props;

  return (
    <View>
      <Image resizeMode="cover" source={{ uri: image }} />
      <View />
      <Text style={styles.productName}>
        {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {
    fontFamily: 'Akkurat',
  },
});

export default ProductCard;
