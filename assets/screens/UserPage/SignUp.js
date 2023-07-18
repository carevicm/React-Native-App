import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, TextInput } from "react-native";
import Error from "../../../Shared/Error";
import Toast from "react-native-toast-message";
import * as Font from "expo-font";
import { Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { JSON_API_REQUEST_EMAIL, JSON_API_REQUEST_SUCCESS, JSON_API_REQUEST_FAIL, JSON_API_REQUEST_NO_EMAIL, JSON_API_REQUEST_ERROR } from 'react-native-dotenv';
import axios from 'axios';

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState('');

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
  }, []);

  const handleRegister = async () => {

    console.log("Proslo!");
    let Email = email;
    let FirstName = firstname;
    let LastName = lastname;
    let phone_number = phone;
    let Password = password;
    const checkEmail = RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i);

    if (email === "" || firstname === ""  || lastname === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
      console.log("Please fill in the form correctly")
      return;
    }else if (!checked) 
    {
      setError("Please accept the terms and conditions");
      console.log("Please accept the terms and conditions");
      return;
    }else if (!(checkEmail).test(email))
    {
      setError("Please enter correct email");
      // alert("Invalid email!!!");
    }
    // Password validations
    else if (password.length<8)
    {
      // alert("Minimum 8 characters required!!!");
      setError("Please enter at least 8 characters");
    }else if (!((/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(password)))
    {
      setError("Please use at least 1 special character");
      // alert("Use at least 1 special character!!!");
    }else if (((/[ ]/).test(password)))
    {
     // alert("Don't include space in password!!!");
      setError("Please don't include spaces in password");
    }else
    {

      const InsertAPIURL = "http://192.168.1.72:5000/register";   //API to render signup

      const headers={
          'Accept':'application/json',
          'Content-Type':'application/json'
      };
      
      const Data=JSON.stringify({
        email:email,
        first_name:firstname,
        last_name:lastname,
        phone_number:phone, 
        password:password
      });

      try {
        const response = await axios.post(InsertAPIURL,Data,{headers: headers},{timeout:1000});

        setData(JSON.stringify(response.data));

        if (response.status == 200)
        {
          console.log(response.status);
          console.log(response.data);
          if (response.data.code=="0")
          {
             //Navigate to next screen if credentials are valid
            console.log("Register is successful!");
            //alert("Register is successful!");
            setShow(true);
            Toast.show({
              topOffset: 0,
              type: "success",
              text1: "Registration Succeeded",
              text2: "Please Sign into your account",
            });
            props.navigation.navigate("SignIn");
            
          }
          else if(response.data.code=="2")
          {
            //setLoggedIn(false);
            console.log("Error occured while registering!");
            alert("Error occured while registering!");
          }
          else if(response.data.code=="3")
          {
            console.log("Server side error while registering!");
            //alert("Server side error while registering!");
            Toast.show({
              topOffset: 0,
              type: "error",
              text1: "Error",
              text2: "Server side error while registering",
            });
          }
          else
          {
            //setLoggedIn(false);
            console.log("User is already registered!");
            //alert("User is already registered!");
            Toast.show({
              topOffset: 0,
              type: "error",
              text1: "User already registered!",
              text2: "Please Sign into your account",
            });
          }
        }else
        {
          //alert("Server/Network error, status code: "+response.status);
          console.log("Server/Network error, status code: "+response.status);
          Toast.show({
            topOffset: 0,
            type: "error",
            text1: "Error",
            text2: "Server/Network error while registering",
          });
          
        }
        
        console.log(Data);
        console.log(response);
        console.log(response.data.code);
        console.log(data);
        //console.log(loggedIn);
        //console.log(response);
      }catch(error){
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
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

    }

    let user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };

/*     Toast.show({
      topOffset: 60,
      type: "success",
      text1: "Registration Succeeded",
      text2: "Please Login into your account",
    }); */
/*     setTimeout(() => {
      props.navigation.navigate("SignIn");
    }, 500).catch((error) => {
      Toast.show({
        topOffset: 150,
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again",
      });
    }); */

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
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { fontFamily: fontLoaded ? "AkkuratBold" : undefined },
          ]}
        >
          Create Account.
        </Text>
      </View>

      <KeyboardAvoidingView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={[styles.inputContainer]}>
          <TextInput
            style={[
              styles.input,
              { fontFamily: fontLoaded ? "Akkurat" : undefined },
            ]}
            placeholder="First Name"
            variant="underlined"
            selectionColor={"#D9D9D9"}
            placeholderTextColor={"#D9D9D9"}
            onChangeText={(text) => setFirstName(text)}
            value={firstname}
            borderBottomWidth={1.5}
            borderBottomColor="white"
            color="white"
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            variant="underlined"
            selectionColor={"#D9D9D9"}
            placeholderTextColor={"#D9D9D9"}
            onChangeText={(text) => setLastName(text)}
            value={lastname}
            borderBottomWidth={1.5}
            borderBottomColor="white"
            color="white"
          />

          <TextInput
            style={styles.input}
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
            style={styles.input}
            placeholder="Phone Number"
            selectionColor={"#D9D9D9"}
            placeholderTextColor={"#D9D9D9"}
            variant="underlined"
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
            value={phone}
            borderBottomWidth={1.5}
            borderBottomColor="white"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            selectionColor={"#D9D9D9"}
            placeholderTextColor={"#D9D9D9"}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
            borderBottomWidth={1.5}
            borderBottomColor="white"
          />
          
          <Pressable
            onPress={togglePasswordVisibility}
            style={{ position: "absolute", right: 25, bottom: 180  }}
          >
            <MaterialIcons style={styles.icon}
              name={showPassword ? "visibility" : "visibility-off"}
              size={25}
              color="white"
            />
          </Pressable>

          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.checkboxContainer}>
            <Pressable
              onPress={() => setChecked(!checked)}
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
              I agree to the terms & conditions
            </Text>
          </View>
          <TouchableOpacity
  style={[
    styles.button,
    { backgroundColor: checked ? "white" : "#D9D9D9" },
  ]}
  onPress={handleRegister}
  title="Sign Up"
  disabled={!checked} // Disable the button when checkbox is not checked
>
  <Text
    style={[
      styles.buttonText,
      { fontFamily: fontLoaded ? "AkkuratBold" : undefined },
    ]}
  >
    Sign Up
  </Text>
</TouchableOpacity>

          <View style={styles.bottomContainer}>
            <Text
              style={[
                styles.bottomText,
                { fontFamily: fontLoaded ? "Akkurat" : undefined },
              ]}
            >
              An Aleph Member?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignIn")}
              title="Sign In"
            >
              <Text
                style={[
                  styles.bottomText,
                  styles.signInText,
                  { fontFamily: fontLoaded ? "Akkurat" : undefined },
                ]}
              >
                Sign In
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
    paddingTop: 38,
    padding: 24,
    fontSize: 14,
  },
  input: {
    fontFamily: "Akkurat",
    color: "#D9D9D9",
    marginBottom: 15,
    padding: 10,
    letterSpacing: 0.3,
  },
  icon:{
  padding: 60,
  left: 60,
  },
  error: {
    color: "red",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkbox: {
    width: 13,
    height: 13,
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
    borderRadius: 5,
    width: 365,
    height: 62,
    backgroundColor: "white",
    top: 60,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontFamily: "AkkuratBold",
  },
  bottomText: {
    fontSize: 12,
    bottom: 5,
    lineHeight: 18,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    letterSpacing: 0.3,
 
  },
  signInText: {
    marginLeft: 10,
    color: "#A59449",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 75,
  },
  checkboxText: {
    color: "white",
    left: 10,
    fontSize: 11,
  },
});

export default SignUp;

{
  /* <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        value={props.value}
        autoCorrect={props.autoCorrect}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
      /> */
}
