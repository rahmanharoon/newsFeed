import { Image } from "expo-image";
import React, { memo, useEffect, useRef } from "react";
import CustomButton from "./CustomButton";
import { themes } from "../assets/common/themes";
import { StyleSheet, Text, View, Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { IHeadline } from "../interface/headline.interface";

const NO_IMG = require("../assets/images/no-photo.png");

interface IHeadlineCardProps extends IHeadline {
  index: number;
  isPin?: boolean;
  onPinHandler?: () => void;
  onDeleteHandler?: () => void;
  onUnpinHandler?: () => void;
}

const HeadlineCard = ({
  content,
  title,
  isPin,
  urlToImage,
  publishedAt,
  onUnpinHandler,
  description,
  onPinHandler,
  onDeleteHandler,
  index,
}: IHeadlineCardProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const date = new Date(publishedAt);

  // Get the individual components of the date
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
  const year = date.getUTCFullYear();
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  // Format the date components into the desired format
  const formattedDate = `${day < 10 ? "0" : ""}${day}-${
    month < 10 ? "0" : ""
  }${month}-${year} ${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${amPm}`;

  const renderHeadlineRight = (
    progressAnimatedValue: unknown,
    dragAnimatedValue: unknown,
    swipeable: Swipeable
  ) => {
    const onPin = () => {
      if (onPinHandler) {
        onPinHandler();
      }
      swipeable.close();
    };
    const onDelete = () => {
      if (onDeleteHandler) {
        onDeleteHandler();
      }
      swipeable.close();
    };
    return (
      <View style={styles.leftAction}>
        <CustomButton
          title="PIN"
          onBtnHandler={onPin}
          backgroundColor={themes.skyBlue}
        />
        <CustomButton
          title="DELETE"
          onBtnHandler={onDelete}
          backgroundColor={themes.red}
        />
      </View>
    );
  };

  const renderPinnedHeadlineRight = (
    progressAnimatedValue: unknown,
    dragAnimatedValue: unknown,
    swipeable: Swipeable
  ) => {
    const onUnPin = () => {
      if (onUnpinHandler) {
        onUnpinHandler();
      }
      swipeable.close();
    };
    return (
      <View style={styles.leftAction}>
        <CustomButton
          title="UN-PIN"
          onBtnHandler={onUnPin}
          backgroundColor={themes.skyBlue}
        />
      </View>
    );
  };

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      delay: index * 100, // Stagger animation by index
      useNativeDriver: true,
    }).start();
  }, [animatedValue, index]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0], // Start 50 units down, end at position
  });

  const cardStyle = StyleSheet.compose(styles.headlineCard, [
    isPin ? styles.pinnedCard : null,
    { opacity: animatedValue, transform: [{ translateY }] },
  ]);

  return (
    <Swipeable
      renderRightActions={
        isPin ? renderPinnedHeadlineRight : renderHeadlineRight
      }
    >
      <Animated.View style={cardStyle}>
        <Image
          contentFit="cover"
          transition={1000}
          style={styles.image}
          placeholder={{ blurhash }}
          source={urlToImage ?? NO_IMG}
        />
        <View style={styles.colView}>
          <Text style={styles.headTxt} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          {description ?? content ? (
            <Text style={styles.desTxt} numberOfLines={2} ellipsizeMode="tail">
              {description ?? content}
            </Text>
          ) : null}
          <Text style={styles.timeTxt}>{formattedDate}</Text>
        </View>
      </Animated.View>
    </Swipeable>
  );
};

export default memo(HeadlineCard);

const styles = StyleSheet.create({
  headlineCard: {
    gap: 6,
    padding: 8,
    height: 80,
    borderRadius: 6,
    borderWidth: 0.5,
    flexDirection: "row",
    borderColor: themes.border,
    backgroundColor: themes.white,
  },
  leftAction: {
    gap: 4,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pinnedCard: {
    borderWidth: 1,
    borderColor: themes.skyBlue,
  },
  headTxt: {
    fontSize: 14,
    fontWeight: "600",
    color: themes.black,
  },
  desTxt: {
    fontSize: 12,
    color: themes.grey,
  },
  colView: {
    flex: 1,
    justifyContent: "space-between",
  },
  timeTxt: {
    fontSize: 10,
    color: themes.hash,
    alignSelf: "flex-end",
  },
  image: {
    width: 70,
    height: "100%",
    borderRadius: 6,
  },
});
