import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import RowButtons from "./components/RowButtons";
import CardDetail from "./components/CardDetail";
import CardWrapper from "./components/CardWrapper";

const fontFetch = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};
const fontConfig = {
  android: {
    regular: {
      fontFamily: "open-sans",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "open-sans-bold",
      fontWeight: "normal",
    },
  },
};
const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  // background: "black",
  // colors: { crvena: "red" },
};

export default function App() {
  const [fonts, setFonts] = useState(false);
  if (!fonts) {
    return (
      <AppLoading
        startAsync={fontFetch}
        onFinish={() => setFonts(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  // return (
  //   <PaperProvider theme={theme}>
  //     <View
  //       style={{ ...styles.container /*, backgroundColor: theme.background */ }}
  //     >
  //       <Text /*style={{ ...theme.fonts.thin, color: theme.colors.crvena }}*/>
  //         Dummy text
  //       </Text>
  //     </View>
  //   </PaperProvider>
  // );
  return (
    <View style={styles.container}>
      <CardWrapper />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
