import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity,  StatusBar, } from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const VisitHistoryScreen = (props) => {
  const { visitHistory } = props.route.params;
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();

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

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Akkurat: require("../../fonts/Akkurat.ttf"),
        AkkuratBold: require("../../fonts/Akkurat-Bold.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();

    checkUserData();
    setTimeout(() => {
      setFirstname(userData);
      console.log("JSON const: "+JSON.stringify(userData));
      console.log(email);
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />

<TouchableOpacity
  onPress={() => navigation.goBack()}
  style={[
    styles.backButton,
    { fontFamily: fontLoaded ? "AkkuratBold" : undefined },
  ]}
>
  <Ionicons name="arrow-back" size={37} color="white" />
</TouchableOpacity>
<View style={styles.header}>
<Text style={[
            styles.title,
            { fontFamily: fontLoaded ? "AkkuratBold" : undefined },
          ]}>Your History</Text>
          <Text style={styles.middletext}>Members Name: {name}</Text>
          <Text style={styles.middletext}>Membership Number: 00901000{id}</Text>
</View>
      
      {visitHistory.map((visit, index) => (
        <View key={index} style={styles.visitContainer}>
          <Text style={styles.storeName}>{visit.name}</Text>
          <Text style={styles.discountText}>{visit.discount}</Text>
          <Text style={styles.savedText}>Saved $ {visit.savedAmount}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },
  backButton: {
    position: "absolute",
    left: 22,
    top: 50,
    zIndex: 1,
  },

  header: {
    paddingTop: 180,
    position: "relative",
    backgroundColor: "black",
    borderBottomLeftRadius: 50,
    
  },
  title: {
    position: "absolute",
    width: 136,
    color: "white",
    marginTop: 12,
    fontStyle: "normal",
    height: 60,
    left: 27,
    bottom: 30,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 0.2,
  },
  middletext:{
    color: 'white',
    fontFamily: "Akkurat",
    left: 10,
  },
  visitContainer: {
    backgroundColor: "#333333",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  storeName: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
  discountText: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  savedText: {
    color: "white",
    fontSize: 16,
  },
});

export default VisitHistoryScreen;
