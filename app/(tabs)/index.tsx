import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function App() {
  const [fontsLoaded] = useFonts({
    "gl-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
    "gl-ExtraBold": require("../../assets/fonts/Gilroy-ExtraBold.ttf"),
    "gl-Light": require("../../assets/fonts/Gilroy-Light.ttf"),
    "gl-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
    "gl-SemiBold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
    "gl-Regular": require("../../assets/fonts/Gilroy-Regular.ttf"),
    "gl-Thin": require("../../assets/fonts/Gilroy-Thin.ttf"),
  });

  return (
    <>
      <StatusBar style='light' />
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/Logo/logo.png")}
          />
          <View>
            <Link href={"/help"} asChild>
              <TouchableOpacity>
                <Text style={{ color: "#c1c1c1", fontFamily: "gl-Regular" }}>
                  Learn More
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
            Manage your modern-day finance easily with
          </Text>
          <Text
            style={{
              color: "#7076F1",
              fontSize: 50,
              fontFamily: "gl-Bold",
              paddingVertical: 5,
            }}>
            ChainVest!
          </Text>
          <Text
            style={{
              color: "#c1c1c1",
              fontSize: 15,
              fontFamily: "gl-Regular",
            }}>
            *with crypto preview support
          </Text>
        </View>
        <Image
          style={styles.homeChart}
          source={require("../../assets/images/Landing/HomeChart.png")}
        />
        <View style={styles.landingButtonConatiner}>
          <Link href={"/signup"} asChild>
            <TouchableOpacity
              style={{
                backgroundColor: "#7076F1",
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
          </Link>
          <Link href={"/login"} asChild>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#f2f2f2",
                  fontSize: 22,
                  fontFamily: "gl-Medium",
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
        <Text
          style={{
            color: "#f2f2f2",
            fontSize: 15,
            textAlign: "center",
            paddingVertical: 18,
            fontFamily: "gl-Regular",
          }}>
          *Sign up now to get started with a 5 days of free trial
        </Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
  homeChart: {
    width: 400,
    height: 400,
    resizeMode: "contain",
    justifyContent: "center",
    marginTop: 60,
  },
  landingButtonConatiner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 80,
    top: -10,
  },
});
