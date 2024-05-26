import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { themes } from "../assets/common/themes";

const HeaderText = ({
  title,
  count,
  isSpacing,
}: {
  title: string;
  count: number;
  isSpacing?: boolean;
}) => {
  const headerCardStyle = StyleSheet.compose(
    styles.rowBetween,
    isSpacing ? styles.mt12 : null
  );
  return (
    <View style={headerCardStyle}>
      <Text style={styles.headerTxt}>{title}</Text>
      <Text style={styles.descText}>{count}</Text>
    </View>
  );
};

export default HeaderText;

const styles = StyleSheet.create({
  rowBetween: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTxt: {
    fontSize: 16,
    fontWeight: "600",
    color: themes.black,
  },
  descText: {
    fontSize: 12,
    color: themes.hash,
  },
  mt12: { marginTop: 12 },
});
