import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React, { memo } from "react";
import { themes } from "../assets/common/themes";

const CustomButton = ({
  title,
  btnStyle,
  onBtnHandler,
  backgroundColor,
}: {
  title: string;
  backgroundColor: string;
  onBtnHandler: () => void;
  btnStyle?: StyleProp<ViewStyle>;
}) => {
  const buttonStyle = StyleSheet.compose(styles.rightButton, [
    btnStyle,
    { backgroundColor },
  ]);
  return (
    <TouchableOpacity style={buttonStyle} onPress={onBtnHandler}>
      <Text style={styles.txtClr}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(CustomButton);

const styles = StyleSheet.create({
  rightButton: {
    width: 60,
    borderRadius: 4,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  txtClr: {
    color: themes.white,
  },
});
