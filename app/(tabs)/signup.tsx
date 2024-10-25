import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Link, useRouter } from "expo-router";
import Login from "./login";
import { useSignUp } from "@clerk/clerk-expo";

const Signup = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();

  const { signUp } = useSignUp();
  const onSignup = async () => {
    const fullPhoneNumber = `${countryCode} ${phoneNumber}`;
    // router.push({
    //   pathname: "/(tabs)/verify/[phone]",
    //   params: { phone: fullPhoneNumber },
    // });
    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber,
      });
      signUp!.preparePhoneNumberVerification();
      router.push({
        pathname: "/(tabs)/verify/[phone]",
        params: { phone: fullPhoneNumber },
      });
    } catch (error) {
      console.log("Error Signing Up", error);
    }
  };

  return (
    <SafeAreaView style={styles.SignUpContainer}>
      <View style={styles.topBar}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/Logo/logo.png")}
        />
        <View>
          <Link href={"/help"} asChild>
            <TouchableOpacity>
              <Text style={{ color: "#c1c1c1", fontFamily: "gl-Regular" }}>
                Need Help?
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <View style={styles.heroTextView}>
        <Text
          style={{
            color: "#f2f2f2",
            fontSize: 40,
            fontFamily: "gl-Regular",
            paddingVertical: 10,
          }}>
          Welcome to
        </Text>
        <Text
          style={{
            color: "#7076F1",
            fontSize: 50,
            fontFamily: "gl-Bold",
          }}>
          ChainVest!
        </Text>
        <Text
          style={{
            color: "#C1C1C1",
            fontSize: 15,
            paddingVertical: 18,
            fontFamily: "gl-Regular",
          }}>
          *get 5 days of free trial, no credit card required
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            // placeholder='Country Code '
            placeholderTextColor='#c1c1c1'
            value={countryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder='Enter your phone number....'
            placeholderTextColor='#c1c1c1'
            keyboardType='numeric'
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <Text
          style={{
            color: "#C1C1C1",
            fontSize: 18,
            lineHeight: 30,
            fontFamily: "gl-Regular",
            marginBottom: 100,
          }}>
          *Enter your phone number to receive a verification code
        </Text>
        <View style={{ alignItems: "center", flex: 1, top: 30 }}>
          <TouchableOpacity
            onPress={onSignup}
            disabled={phoneNumber === ""}
            style={{
              backgroundColor: phoneNumber === "" ? "gray" : "#7076F1",
              width: 225,
              height: 55,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: "#f2f2f2",
                fontSize: 22,
                fontFamily: "gl-Medium",
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          top: 120,
          gap: 5,
          justifyContent: "center",
        }}>
        <Text
          style={{
            color: "#C1C1C1",
            fontSize: 24,
            fontFamily: "gl-Regular",
          }}>
          Already have an account?
        </Text>
        <Link href={"/login"} asChild>
          <TouchableOpacity>
            <Text
              style={{
                color: "#7076F1",
                fontSize: 24,
                fontFamily: "gl-SemiBold",
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  SignUpContainer: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    paddingHorizontal: 25,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroTextView: {
    marginTop: 60,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 15,
  },
  input: {
    backgroundColor: "#6A6DA5",
    height: 50,
    borderRadius: 10,
    color: "#C1C1C1",
    fontFamily: "gl-Medium",
    paddingLeft: 10,
    paddingRight: 8,
    fontSize: 20,
  },
});
