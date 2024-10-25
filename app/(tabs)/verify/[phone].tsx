import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-gesture-handler";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

const Phone = () => {
  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin: string;
  }>();

  const [code, setCode] = useState("");
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      console.log("code", code);

      // verify code
      if (signin === "true") {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({
        code,
      });
      await setActive!({ session: signUp!.createdSessionId });
    } catch (error) {
      console.log("error", JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].message);
      }
    }
  };
  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: "phone_code",
        code,
      });
      await setActive!({ session: signIn!.createdSessionId });
    } catch (error) {
      console.log("error", JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].message);
      }
    }
  };
  return (
    <SafeAreaView style={styles.PhoneContainer}>
      <StatusBar style='dark' />
      <Text>Enter the 6 digit code </Text>
      <Text>Code sent to {phone} unless you already have an account</Text>

      {/* CodeField */}
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        autoComplete={Platform.select({
          android: "sms-otp",
          default: "one-time-code",
        })}
        testID='my-code-input'
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />

      {/* CodeField */}

      {/* already have */}
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
      {/* already have */}
    </SafeAreaView>
  );
};

export default Phone;

const styles = StyleSheet.create({
  PhoneContainer: {
    flex: 1,
    paddingHorizontal: 25,
  },
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});
