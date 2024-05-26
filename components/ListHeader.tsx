import { StyleSheet, View } from "react-native";
import React, { memo, useMemo } from "react";
import { IHeadline } from "../interface/headline.interface";
import HeaderText from "./HeaderText";
import HeadlineCard from "./HeadlineCard";

const ListHeader = ({
  timer,
  pinnedHeadlines,
  unPinHandler,
}: {
  timer: number;
  pinnedHeadlines: IHeadline[];
  unPinHandler: (idx: number) => void;
}) => {
  const renderPinnedItems = useMemo(() => {
    return pinnedHeadlines?.map((data: IHeadline, index: number) => {
      const onPinFunc = () => unPinHandler(index);
      return (
        <HeadlineCard
          isPin
          {...data}
          key={data?.title}
          onUnpinHandler={onPinFunc}
        />
      );
    });
  }, [pinnedHeadlines]);

  return (
    <>
      {pinnedHeadlines?.length > 0 ? (
        <View style={styles.g8}>
          <HeaderText title="Pinned HeadLines" />
          {renderPinnedItems}
        </View>
      ) : null}
      <HeaderText title="HeadLines" timer={timer} />
    </>
  );
};

export default memo(ListHeader);

const styles = StyleSheet.create({
  g8: {
    gap: 8,
  },
});
