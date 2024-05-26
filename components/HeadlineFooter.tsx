import React, { memo } from "react";
import CustomButton from "./CustomButton";
import { themes } from "../assets/common/themes";
import { StyleSheet, Text, View } from "react-native";

const HeadlineFooter = ({
  page,
  headlineCount,
  onBtnHandler,
}: {
  page: number;
  headlineCount: number;
  onBtnHandler: () => void;
}) => {
  return (
    <View style={styles.footerCard}>
      <Text>{`${page} / 10`}</Text>
      <CustomButton
        onBtnHandler={onBtnHandler}
        btnStyle={styles.bottomBtn}
        backgroundColor={themes.black}
        title={page === 10 ? "Reset" : "Load More"}
      />
    </View>
  );
};

export default memo(HeadlineFooter);

const styles = StyleSheet.create({
  footerCard: {
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBtn: { height: 45, width: "40%", borderRadius: 8 },
});
