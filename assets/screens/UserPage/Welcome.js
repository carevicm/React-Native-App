import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as Font from 'expo-font';
import { Tab, Tabs } from 'native-base';

const Welcome = (props) => {
  const isFocused = useIsFocused();
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


  const handleSignIn = () => {
    props.navigation.navigate("SignIn");
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.content} >
        <View>
          <Text style={[styles.Text, { fontFamily: fontLoaded ? "Akkurat" : undefined }]}>WELCOME TO</Text>
          <Image source={require('../../../assets/Favicons/Aleph-logo.png')} style={styles.image} />
        </View>
        <View>
          <Text style={[styles.middleText, { fontFamily: fontLoaded ? "Akkurat" : undefined }]}>
            By joining Aleph as a member, individuals can enjoy the perks of accessing significant savings and exciting offers from partnering businesses. Whether you're looking to update your wardrobe, indulge in delicious cuisine, need any services, or plan your next adventure, the Aleph Club app is your gateway to an array of discounts and enticing opportunities.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("SignUp")}
          title="Sign Up"
        >
        <Text style={[styles.buttonText, { fontFamily: fontLoaded ? "AkkuratBold" : undefined } ]}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
  <Text style={[styles.bottomText, { fontFamily: fontLoaded ? "Akkurat" : undefined }]}>An Aleph member?</Text>
  <TouchableOpacity onPress={handleSignIn}>
    <Text style={[styles.bottomText, styles.signInText, { fontFamily: fontLoaded ? "Akkurat" : undefined }]}>Sign In</Text>
  </TouchableOpacity>
</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: 'center',
    alignContent: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  Text: {
    alignSelf: "center",
    color: 'white',
    lineHeight: 18, 
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    letterSpacing: 2.5,
    lineHeight: 17.74, 
    position: 'absolute',
    bottom: 70,
  },
  image:{
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    top: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 5,
    width: 350,
    height: 62,
    backgroundColor: 'white',
    top: 150,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'AkkuratBold',
  },
  middleText: {
    top: 30,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 0.5,
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 17.74,
    fontWeight: '200',
  },
  bottomText: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 15, 
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    letterSpacing: 0.5,
    top: 160,
    fontWeight: '200',
  },
  signInText: {
    marginLeft: 10,
    color: "#A59449",
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  
});

export default Welcome;
