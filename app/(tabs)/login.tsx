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
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Link, useRouter } from "expo-router";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";

// Sign In Types

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Login = () => {
  // States
  const [countryCode, setCountryCode] = useState("+49");
  const [phoneNumber, setPhoneNumber] = useState("");

  // login conditions handling
  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });

        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor: any) => {
            return factor.strategy === "phone_code";
          },
        );

        const { phoneNumberId } = firstPhoneFactor;
        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        router.push({
          pathname: "/(tabs)/verify/[phone]",
          params: { phone: fullPhoneNumber, signin: "true" },
        });
      } catch (error) {
        console.log("error", JSON.stringify(error, null, 2));
        if (isClerkAPIResponseError(error)) {
          if (error.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", error.errors[0].message);
          }
        }
      }
    }
  };

  const router = useRouter();
  const { signIn } = useSignIn();

  return (
    <SafeAreaView style={styles.SignUpContainer}>
      {/* header */}
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
      {/* header */}

      <View style={styles.heroTextView}>
        {/* Hero Section Text*/}
        <Text
          style={{
            color: "#f2f2f2",
            fontSize: 40,
            fontFamily: "gl-Regular",
            paddingVertical: 10,
          }}>
          Welcome Back
        </Text>
        <Text
          style={{
            color: "#7076F1",
            fontSize: 50,
            fontFamily: "gl-Bold",
          }}>
          ChainVester!
        </Text>
        <Text
          style={{
            color: "#C1C1C1",
            fontSize: 20,
            lineHeight: 30,
            width: 350,
            fontFamily: "gl-Regular",
            marginBottom: 30,
          }}>
          *Enter the phone number associated with your account
        </Text>
        {/* Hero Section Text */}

        {/* Input Sections */}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            // placeholder='Country Code '
            placeholderTextColor='#c1c1c1'
            value={countryCode}
            onChangeText={setCountryCode}
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
        {/* Input Sections */}

        {/* Email Button */}

        <TouchableOpacity
          disabled={phoneNumber != ""}
          onPress={() => onSignIn(SignInType.Email)}
          style={{
            width: "100%",
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginBottom: 20,
            marginTop: 20,
            backgroundColor: phoneNumber === "" ? "#dfdfdf" : "gray",
          }}>
          <View style={{ flexDirection: "row", gap: 30, alignItems: "center" }}>
            <Image
              style={{
                height: 25,
                width: 25,
                resizeMode: "contain",
              }}
              source={require("../../assets/images/Icons/email.png")}
            />
            <Text
              style={{
                color: "#2A2A2A",
                fontSize: 20,
                fontFamily: "gl-Medium",
                textAlign: "center",
              }}>
              Continue With Email
            </Text>
          </View>
        </TouchableOpacity>
        {/* Email Button */}

        {/* Google Button */}
        <TouchableOpacity
          disabled={phoneNumber != ""}
          onPress={() => onSignIn(SignInType.Google)}
          style={{
            width: "100%",
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: phoneNumber === "" ? "#dfdfdf" : "gray",
          }}>
          <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
            <Image
              style={{
                height: 25,
                width: 25,
                resizeMode: "contain",
              }}
              source={require("../../assets/images/Icons/google.png")}
            />
            <Text
              style={{
                textAlign: "center",
                color: "#2A2A2A",
                fontSize: 20,
                fontFamily: "gl-Medium",
              }}>
              Continue With Google
            </Text>
          </View>
        </TouchableOpacity>
        {/* Google Button */}

        {/* Apple Button */}
        <TouchableOpacity
          disabled={phoneNumber != ""}
          onPress={() => onSignIn(SignInType.Apple)}
          style={{
            width: "100%",
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginBottom: 30,
            marginTop: 20,
            backgroundColor: phoneNumber === "" ? "#dfdfdf" : "gray",
          }}>
          <View style={{ flexDirection: "row", gap: 30, alignItems: "center" }}>
            <Image
              style={{
                height: 25,
                width: 25,
                resizeMode: "contain",
              }}
              source={require("../../assets/images/Icons/apple.png")}
            />
            <Text
              style={{
                color: "#2A2A2A",
                fontSize: 20,
                fontFamily: "gl-Medium",
                textAlign: "center",
              }}>
              Continue With Apple
            </Text>
          </View>
        </TouchableOpacity>
        {/* Apple Button */}

        {/* Login Button */}
        <View style={{ alignItems: "center", flex: 1, top: 30 }}>
          <TouchableOpacity
            onPress={() => onSignIn(SignInType.Phone)}
            disabled={phoneNumber === ""}
            style={{
              width: 225,
              height: 55,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: phoneNumber === "" ? "gray" : "#7076F1",
            }}>
            <Text
              style={{
                color: "#f2f2f2",
                fontSize: 22,
                fontFamily: "gl-Medium",
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        {/* Login Button */}
      </View>

      {/* New Here Section */}
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
          New Here?
        </Text>
        <Link href={"/signup"} asChild>
          <TouchableOpacity>
            <Text
              style={{
                color: "#7076F1",
                fontSize: 24,
                fontFamily: "gl-SemiBold",
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link>
        {/* New Here Section */}
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
    paddingVertical: 10,
    gap: 15,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#6A6DA5",
    height: 55,
    borderRadius: 10,
    color: "#C1C1C1",
    fontFamily: "gl-Medium",
    paddingLeft: 10,
    paddingRight: 8,
    fontSize: 20,
  },
  emailButtonContainer: {
    width: 225,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#d7d7d7",
  },
});
