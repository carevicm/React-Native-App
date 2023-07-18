import React, { useState, useEffect } from "react";
import {  View,  Text,  StyleSheet,  TouchableOpacity,  StatusBar,  KeyboardAvoidingView,  TextInput,  Pressable,} from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  JSON_API_REQUEST_EMAIL,
  JSON_API_REQUEST_SUCCESS,
  JSON_API_REQUEST_FAIL,
  JSON_API_REQUEST_NO_EMAIL,
  JSON_API_REQUEST_ERROR,
} from "react-native-dotenv";
import Toast from "react-native-toast-message";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const insets = useSafeAreaInsets();
  const [show, setShow] = useState(false);
  const [rememberSignIn, setRememberSignIn] = useState(false);
  const [data, setData] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
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

    // Check if the user's sign-in is remembered
    checkRememberSignIn();
  }, []);

  const checkRememberSignIn = async () => {
    try {
      const rememberSignInValue = await AsyncStorage.getItem("rememberSignIn");
      console.log(rememberSignInValue);
      if (rememberSignInValue === "true") {
        setRememberSignIn(true);
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

  const storeUserData = async (value) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(value));
      console.log("Object stored: " + JSON.stringify(value));
    } catch (error) {
      console.log("Error storing rememberSignIn value:", error);
    }
  };

  const handleSubmit = async () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
      console.log(error);
      alert("Username or password is missing.");
    } else {
      console.log("success");
      console.log(user);

      const LoginAPIURL = "http://192.168.1.72:5000/login"; //API to render login

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const Data = JSON.stringify({
        Email: email,
        Password: password,
      });
      //http://192.168.1.97:5000/login http://192.168.4.20:5000/login

      try {
        const response = await axios.post(
          LoginAPIURL,
          Data,
          { headers: headers },
          { timeout: 1000 }
        );

        setData(JSON.stringify(response.data));

        if (response.status == 200) {
          console.log(response.status);
          console.log(response.data);
          if (response.data.code == JSON_API_REQUEST_SUCCESS) {
            //Navigate to next screen if credentials are valid
            console.log("Login is successful!");
            //alert("Login is successful!");
            storeRememberSignIn(rememberSignIn);
            storeUserData(response.data);
            checkRememberSignIn();
            Toast.show({
              topOffset: 0,
              type: "success",
              text1: "Login is successful",
              text2: "You are logged into your account",
            });
            props.navigation.navigate("Main");
          } else if (response.data.code == JSON_API_REQUEST_ERROR) {
            //setLoggedIn(false);
            console.log("Error occured while logging in");
            setError("Error occured while logging in!");
            //alert("Error occured while registering!");
            Toast.show({
              topOffset: 0,
              type: "error",
              text1: "Error",
              text2: "Error occured while logging in!",
            });
          } else if (response.data.code == JSON_API_REQUEST_FAIL) {
            //setLoggedIn(false);
            console.log("Password is not valid!");
            setError("Password is not valid!");
            //alert("Password is not valid!");
            Toast.show({
              topOffset: 0,
              type: "error",
              text1: "Error",
              text2: "Password is not valid!",
            });
          } else {
            console.log("There is no user with that email.");
            setError("There is no user with that email.");
            //alert("There is no user with that email.");
            Toast.show({
              topOffset: 0,
              type: "error",
              text1: "Error",
              text2: "There is no user with this email!",
            });
          }
        } else {
          //alert("Server/Network error, status code: "+response.status);
          console.log("Server/Network error, status code: " + response.status);
          Toast.show({
            topOffset: 0,
            type: "error",
            text1: "Error",
            text2: "Server/Network error while logging in",
          });
        }

        console.log(Data);
        console.log(response);
        console.log(response.data.code);
        console.log(data);
        //console.log(loggedIn);
        //console.log(response);
      } catch (error) {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log(error.request);
          console.log("network error");
          Toast.show({
            topOffset: 0,
            type: "error",
            text1: "Network error",
            text2: "Please try again later",
          });
        } else {
          console.log(error);
        }
      }

      //This code is plain native fetch with await method and it works too!
      /* try {

        const response = await fetch('http://192.168.1.97:5000/login',{
        method:'POST',
        headers:headers,
        body:Data //convert data to JSON
      });

        const user = await response.text();

        if (response.status==200){
          navigation.navigate("UserProfile");
        }
        console.log(response.status);
        console.log(user);
        

        setData(JSON.stringify(user));
        console.log(data);
        
      } catch (error) {

         if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
     
      } */

      // Store the rememberSignIn value if checked
      if (rememberSignIn) {
        storeRememberSignIn(true);
      }

      const storeData = async (value) => {
        try {
          await AsyncStorage.setItem("my-key", value);
        } catch (e) {
          // saving error
        }
      };

      // Store the rememberSignIn value if checked
      if (rememberSignIn) {
        storeRememberSignIn(true);
      }
    }
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
    setRememberSignIn(!rememberSignIn);
  };

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

      <View style={[styles.header]}>
        <Text
          style={[
            styles.title,
            { fontFamily: fontLoaded ? "AkkuratBold" : undefined },
          ]}
        >
          Welcome Back.
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.contentContainer}
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
      >
        <View style={[styles.inputContainer]}>
          <TextInput
            style={[
              styles.input,
              { fontFamily: fontLoaded ? "Akkurat" : undefined },
            ]}
            selectionColor={"#D9D9D9"}
            placeholderTextColor={"#D9D9D9"}
            placeholder={"Email"}
            variant="underlined"
            name={"email"}
            id={"email"}
            value={email}
            borderBottomWidth={1.5}
            borderBottomColor="white"
            onChangeText={(text) => setEmail(text.toLowerCase())}
          />
          <TextInput
            placeholder="Password"
            selectionColor={"#D9D9D9"}
            placeholderTextColor={"#D9D9D9"}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{
              borderBottomWidth: 1.5,
              borderBottomColor: "white",
              color: "#D9D9D9",
              padding: 10,
              letterSpacing: 1,
            }}
          />
          <Pressable
            onPress={togglePasswordVisibility}
            style={{ position: "absolute", right: 25, bottom: 30 }}
          >
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={25}
              color="white"
            />
          </Pressable>
        </View>

        <View style={styles.checkboxContainer}>
          <Pressable
            onPress={handleCheckboxChange}
            style={[
              styles.checkbox,
              checked ? styles.checkboxChecked : styles.checkboxUnchecked,
            ]}
          >
            <Ionicons
              name={checked ? "checkbox" : "checkbox-outline"}
              size={20}
              style={[
                styles.checkboxIcon,
                checked
                  ? styles.checkboxCheckedIcon
                  : styles.checkboxUncheckedIcon,
              ]}
            />
          </Pressable>
          <Text
            style={[
              styles.checkboxText,
              { fontFamily: fontLoaded ? "Akkurat" : undefined },
            ]}
          >
            Remember me
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            title="Sign In"
          >
            <Text
              style={[
                styles.buttonText,
                { fontFamily: fontLoaded ? "AkkuratBold" : undefined },
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>

          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignIn")}
              title="Sign In"
            >
              <Text style={[styles.bottomText, styles.signInText]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 80, // Adjust this value as needed
  },
  backButton: {
    position: "absolute",
    left: 22,
    top: 60,
    zIndex: 1,
  },

  header: {
    paddingTop: 160,
    position: "relative",
    backgroundColor: "black",
    borderBottomLeftRadius: 50,
    paddingBottom: 60,
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
  inputContainer: {
    fontFamily: "Akkurat",
    paddingTop: 100,
    padding: 24,
    fontSize: 14,
  },
  input: {
    fontFamily: "Akkurat",
    color: "white",
    padding: 5,
    marginBottom: 20,
    color: "white",
    marginTop: 10,
    letterSpacing: 0.3,
  },
  error: {
    color: "red",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 100,
    marginLeft: 25,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxIcon: {
    fontSize: 16,
    width: 16,
    height: 16,
    borderRadius: 18,
  },
  checkboxChecked: {
    backgroundColor: "transparent",
  },
  checkboxUnchecked: {
    backgroundColor: "white",
  },
  checkboxCheckedIcon: {
    color: "white",
    borderColor: "white",
  },
  checkboxUncheckedIcon: {
    color: "transparent",
    borderColor: "white",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 5,
    width: 360,
    height: 62,
    backgroundColor: "white",
    bottom: 60,
    left: 25,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontFamily: "AkkuratBold",
  },
  bottomText: {
    fontSize: 12,

    lineHeight: 18,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "#D9D9D9",
    letterSpacing: 0.3,
    bottom: 70,
  },
  signInText: {
    fontFamily: "Akkurat",
    left: 128,
    color: "white",
    letterSpacing: 0.3,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  checkboxText: {
    color: "white",
    left: 10,
    fontSize: 11,
    letterSpacing: 0.3,
  },
});

export default Login;
