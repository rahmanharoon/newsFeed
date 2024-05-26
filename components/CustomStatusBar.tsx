import { StyleSheet, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const CustomStatusBar = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        height: top,
      }}
    >
      <StatusBar
        translucent
        style="dark"
        animated={true}
        backgroundColor="transparent"
      />
    </View>
  );
};

export default CustomStatusBar;
