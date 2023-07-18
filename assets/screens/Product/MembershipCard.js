import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Box } from "native-base";
import * as Font from "expo-font";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CardScreen = ({ navigation }) => {
  const qrData = 'https://alephmagazine.com/';

  const [fontLoaded, setFontLoaded] = useState(false);
  const [expirationDate, setExpirationDate] = useState(null);
  const [userData, setUserData] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [memberNumber, setMemberNumber] = useState();
  const [godina, setGodina] = useState(2022);
  const [createdAt, setCreatedAt] = useState('2022-05-03');
  
  const original = [
    { 'id': '1', 'desc': 'AAA', 'isOK': true },
    { 'id': '2', 'desc': 'BBB', 'isOK': true },
    { 'id': '3', 'desc': 'CCC', 'isOK': false },
  ];


  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Akkurat: require("../../fonts/Akkurat.ttf"),
        AkkuratBold: require("../../fonts/Akkurat-Bold.ttf"),
      });
      setFontLoaded(true);
    };

    const checkUserData = async () => {
      try {
        const userDataValue = await AsyncStorage.getItem("userData");
        setUserData(JSON.parse(userDataValue));
        console.log("User data: "+userDataValue);
        console.log(JSON.parse(userDataValue).email);
        setEmail(JSON.parse(userDataValue).email);
        setFirstname(JSON.parse(userDataValue).firstname);
        setLastname(JSON.parse(userDataValue).lastname);
        setName(JSON.parse(userDataValue).firstname+" "+JSON.parse(userDataValue).lastname);
        setId(JSON.parse(userDataValue).id);
        setGodina(Number(JSON.stringify(JSON.parse(userDataValue).createdAt).substring(1,5))+1);
        setCreatedAt(JSON.stringify(JSON.parse(userDataValue).createdAt));

      } catch (error) {
        console.log("Error retrieving userData value:", error);
      }
    };

    const getSignupDate = async () => {
      try {
        const signupDate = await AsyncStorage.getItem('signupDate');
        if (signupDate) {
          const expirationDate = calculateExpirationDate(new Date(signupDate));
          setExpirationDate(expirationDate);
        } else {
          // First signup, set the current date as the signup date
          const currentDate = new Date();
          await AsyncStorage.setItem('signupDate', currentDate.toISOString());
          const expirationDate = calculateExpirationDate(currentDate);
          setExpirationDate(expirationDate);
        }
      } catch (error) {
        console.log('Error retrieving signup date:', error);
      }
    };

    const calculateExpirationDate = (signupDate) => {
      const expirationDate = new Date(signupDate);
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      return expirationDate;
    };

    loadFonts();
    //getSignupDate();
    checkUserData();
    setTimeout(() => {
      setFirstname(userData);
      console.log("JSON const: "+JSON.stringify(userData));
      console.log(email);
    }, 500);

    //handleNumber();
    
  }, []);

  const handleNumber = async () => {

    const nesto = JSON.stringify(id);

    for( let i=0; i<(10-id.length); i++){
      nesto = "0"+nesto;
    }

    setMemberNumber(nesto);
    console.log(memberNumber);

  }

  //{userData?.map(item => <Text>{item.email}</Text>)} {expirationDate ? expirationDate.toDateString() : ''}
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { fontFamily: fontLoaded ? "AkkuratBold" : undefined },
          ]}
        >
          Digital Membership Card
        </Text>
        <Box style={styles.box}>
          <QRCode style={styles.qrcode} value={qrData} size={150} />
        </Box>
      </View>
      <View style={styles.middlesection}>
        <View>
          <Text style={styles.middletext}>Members Name: {name}</Text>

        </View>
        <View>
          <Text style={styles.middletext}>Membership Number: 00901000{id}</Text>
        </View>
        <View>
          <Text style={styles.middletext}>
            Card valid until: {godina+createdAt.substring(5,11)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },

  header: {
    position: "relative",
    backgroundColor: "black",
    borderBottomLeftRadius: 50,
    paddingTop: 100, // Updated paddingTop value to move the text higher
    paddingBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: "relative",
    color: "white",
    fontStyle: "normal",
    bottom: 40,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 170,
    height: 170,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    top: 10,
  },
  qrcode: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    top: 10,
  },
  middletext:{
    color: 'white',
    padding: 20,
  },
  middlesection:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
});

export default CardScreen;