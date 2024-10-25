import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "./../../components/useColorScheme.web";

const Help = () => {
  return (
    <SafeAreaView style={styles.HelpContainer}>
      <Text>
        This is a demo project made by Aparup Ganguly. This Project aims to
        provide expense tracking with minimal effort and with ease, Thank you
        for trying out my project learn more about me at
      </Text>
      <Text
        style={{
          color: "#7076F1",
          borderBottomColor: "#7076F1",
          borderBottomWidth: 1,
          paddingVertical: 10,
          fontSize: 20,
          width: 170,
        }}
        onPress={() => Linking.openURL("http://aparupganguly.com")}>
        Aparup's Portfolio
      </Text>
    </SafeAreaView>
  );
};

export default Help;

const styles = StyleSheet.create({
  HelpContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
