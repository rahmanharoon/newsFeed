import { Text, View } from "react-native";
import React, { memo } from "react";

const NoData = () => {
  return (
    <View>
      <Text>Sorry No Data Found!</Text>
    </View>
  );
};

export default memo(NoData);
