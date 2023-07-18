import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Dimensions, Image, Text } from 'react-native';
import * as Font from 'expo-font';

const { width } = Dimensions.get("window");

const ProductList = (props) => {
  const { item, navigation } = props;
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Akkurat: require("../../fonts/Akkurat.ttf"),
        AkkuratBold: require("../../fonts/Akkurat-Bold.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  const navigateToProductDetail = () => {
    navigation.navigate("StoreScreen", { item: item });
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#343434',
        height: 120,
      }}
      onPress={navigateToProductDetail}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 10, backgroundColor: '#343434' }}>
        <Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={{
            marginTop: 5,
            marginLeft: 3,
            width: 92,
            height: 92,
            borderRadius: 10,
            backgroundColor: '#D9D9D9'
          }}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={[styles.brand, { fontFamily: fontLoaded ? 'AkkuratBold' : undefined }]}>{item.brand}</Text>
          <Text style={[styles.discount, { fontFamily: fontLoaded ? 'AkkuratBold' : undefined }]}>{item.discount}</Text>
          <Text style={[styles.description, { fontFamily: fontLoaded ? 'Akkurat' : undefined }]}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  brand: {
    fontSize: 20,  
    color: '#FFFFFF',
    marginBottom: 5,
    marginLeft: 12,
  },
  discount: {
    fontSize: 32,
    
    color: '#FFFFFF',
    marginBottom: -5,
    marginLeft: 12,
  },
  description: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: -5,
    marginLeft: 12,
  },
};

export default ProductList;
