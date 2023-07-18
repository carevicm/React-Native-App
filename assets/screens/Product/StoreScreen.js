import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, StatusBar, View, Image } from "react-native";
import { VStack, Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";

import { saveVisitHistory } from '../DataStores/VisitHistory';

const StoreScreen = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();
  const [visitHistory, setVisitHistory] = useState([]);
  

  const handleStoreClick = () => {
    const store = { name: item.brand, discount: item.discount, savedAmount: item.savedAmount }; // Customize the store object according to your data structure
    const updatedHistory = [...visitHistory, store];
    setVisitHistory(updatedHistory);
    saveVisitHistory(updatedHistory);
  };

  // Load fonts
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Akkurat: require("../../fonts/Akkurat.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#202020" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.backButton,
            { fontFamily: fontLoaded ? "AkkuratBold" : undefined },
          ]}
        >
          <Ionicons name="arrow-back" size={37} color="white" />
        </TouchableOpacity>
        <Text
          style={[
            styles.title,
            { fontFamily: fontLoaded ? "Akkurat" : undefined },
          ]}
        >
          {item.brand}
        </Text>
      </View>
      <View style={styles.middlesection}>
        <Image
          source={{
            uri: item.image,
            
          }}
          style={styles.image}
        />
  
        
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About:</Text>
          <Text style={styles.aboutText}>{item.about}</Text>
        </View>
        <View style={styles.offerContainer}>
          <Text style={styles.offerTitle}>{item.name} Offer:</Text>
          <Text style={styles.offerText}>{item.discount} {item.description}</Text>
    
          <Text style={styles.offerText}>{item.additionalDiscount} {item.second_description}</Text>
          
        </View>
        <TouchableOpacity onPress={handleStoreClick} style={styles.visitButton}>
          <Text style={styles.visitButtonText}>Redeem In-Store</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    paddingTop: 1,
  },
  backButton: {
    position: "absolute",
    top: 20,
    zIndex: 1,
  },
  header: {
    paddingTop: 90,
    backgroundColor: "#202020",
    left: 20,
  },
  title: {
    color: "#D9D9D9",
    fontSize: 20,
    top: 5,
    left: 5,
  },
  image: {
    width: 360,
    height: 175,
    bottom: 5,
    resizeMode: 'cover',
    backgroundColor: "white"
  },
  
  middlesection: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  offerContainer: {
    alignItems: "center",
    paddingTop: 60,
  },
  offerTitle: {
    fontSize: 18,
    fontFamily: "Akkurat",
    textTransform: "capitalize",
    marginBottom: 10,
    color: "#D9D9D9",
  },
  offerText: {
    color: "#D9D9D9",
    fontWeight: 'bold',
    fontFamily: "Akkurat",
    fontSize: 18,
  },
  visitButton: {
    backgroundColor: "#FC7AFF",
    width: 275,
    height: 62,
    borderRadius: 5,
    marginTop: 40,
    justifyContent: 'center',
    alignContent: 'center'
  },
  visitButtonText: {
    color: "white",
    fontSize: 18,
    letterSpacing: 0.3,
    fontFamily: "Akkurat",
    fontWeight: "bold",
    alignSelf: 'center',
  },
  aboutContainer: {
    marginTop: 20,
    alignSelf: 'flex-start', // Aligns the container to the left side
    left:7,

  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Akkurat",
    textTransform: "capitalize",
    marginBottom: 5,
    color: "#D9D9D9",
  },
  aboutText: {
    color: "#D9D9D9",
    fontSize: 11,
    fontFamily: "Akkurat",
    letterSpacing: 0.3,
  },
});

export default StoreScreen;
