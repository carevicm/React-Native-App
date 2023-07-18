import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@expo/vector-icons";

import jsonData from "../DataStores/Privacydocs.json"
import { loadVisitHistory } from "../DataStores/VisitHistory"; 


const UserProfileScreen = (props) => {
  const [userProfile, setUserProfile] = useState();
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [visitHistory, setVisitHistory] = useState([]);
  const [userData, setUserData] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [memberNumber, setMemberNumber] = useState();
  const [godina, setGodina] = useState(2022);
  const [createdAt, setCreatedAt] = useState('2022-05-03');
  /* const [isAuthenticated, setIsAuthenticated] = useState(false); */


  // Load fonts
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
  
  const handlePrivacyDataPress = (title, description) => {
    navigation.navigate('DataPrivacyScreen', { title, description });
  };
  useEffect(() => {
    const fetchVisitHistory = async () => {
      const history = await loadVisitHistory();
      setVisitHistory(history);
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

    checkUserData();
    setTimeout(() => {
      setFirstname(userData);
      console.log("JSON const: "+JSON.stringify(userData));
      console.log(email);
    }, 500);

    fetchVisitHistory();
  }, []);


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("jwt");
      navigation.navigate("Home");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
  const checkRememberSignIn = async () => {
    try {
      const rememberSignInValue = await AsyncStorage.getItem("rememberSignIn");
      console.log(rememberSignInValue);
      if (rememberSignInValue === "true") {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Error retrieving rememberSignIn value:", error);
    }
  };
  const storeRememberSignIn = async (value) => {
    try {
      await AsyncStorage.setItem("rememberSignIn", value.toString());
      console.log("Object stored");
    } catch (error) {
      console.log("Error storing rememberSignIn value:", error);
    }
  };
 

  useEffect(() => {
    if (!props.isAuthenticated) {
      navigation.navigate("Home");
    }
  }, [props.isAuthenticated]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#202020" translucent={false} />

      <View style={styles.header}>
        <Text style={styles.headerText}> {name}</Text>
        <Text style={styles.secondtext}>Membership Number</Text>
        <Text style={styles.thirdtext}>00901000{id}</Text>
        <View style={styles.underline} />
      </View>
      <View>
        <Image source={require("../../../assets/Favicons/Aleph-logo.png")} style={styles.image} />
      </View>
      <View style={styles.middlesection}>
      <TouchableOpacity
          style={styles.categoryContainer}
          onPress={() => navigation.navigate('VisitHistoryScreen', { visitHistory })}
        >
          <Text style={styles.categorytitle}>Visit History</Text>
          <FontAwesome name="angle-right" size={25} color="white" style={styles.arrowIcon} />
        </TouchableOpacity>
        {Object.entries(jsonData).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={styles.categoryContainer}
            onPress={() => handlePrivacyDataPress(value.title, value.description)}
          >
            <Text style={styles.categorytitle}>{value.title}</Text>
            <FontAwesome name="angle-right" size={25} color="white" style={styles.arrowIcon} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.categoryContainer}>
          <Text style={styles.categorytitle}>Edit Profile</Text>
          <FontAwesome name="angle-right" size={25} color="white" style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryContainer} onPress={handleLogout}>
          <Text style={styles.categorytitle}>Logout</Text>
          <FontAwesome name="angle-right" size={25} color="white" style={styles.arrowIcon} />
        </TouchableOpacity>
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
    paddingTop: 75,
    backgroundColor: "#202020",
    paddingLeft: 25,
  },
  headerText: {
    color: "#D9D9D9",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Akkurat",
    bottom: 10,
    letterSpacing: 0.3,
    right: 8,
  },
  secondtext: {
    color: "#D9D9D9",
    bottom: 5,
    letterSpacing: 0.3,
    height: 16,
  },
  thirdtext: {
    color: "#D9D9D9",
    top: 3,
    letterSpacing: 0.3,
    height: 16,
  },
  underline: {
    position: "relative",
    backgroundColor: "white",
    height: 1,
    width: "93%",
    bottom: -15,
   
  },
  image:{
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    marginTop: 70,
  },
  middlesection: {
    backgroundColor: "#202020",
    flex: 1,
    justifyContent: "center",
    paddingLeft: 25,
    marginBottom: 50,
    paddingRight: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 17.5,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    width: "95%",
  },
  categorytitle: {
    flex: 1,
    color: "#D9D9D9",
    fontSize: 19,
    fontFamily: "Akkurat",
  },
  arrowIcon: {
    right: 5,
  },
});

export default UserProfileScreen;