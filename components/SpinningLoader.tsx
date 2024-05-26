import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { themes } from "../assets/common/themes";

const SpinningLoader = () => {
  return (
    <View style={styles.loadingCard}>
      <Text>Loading!! Please wait</Text>
      <ActivityIndicator size={"large"} color={themes.black} />
    </View>
  );
};

export default memo(SpinningLoader);

const styles = StyleSheet.create({
  loadingCard: {
    gap: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
