import React, { useEffect, useMemo } from "react";
import NoData from "../components/NoData";
import { themes } from "../assets/common/themes";
import HeaderText from "../components/HeaderText";
import { useFetchNews } from "../hooks/useFetchNews";
import HeadlineCard from "../components/HeadlineCard";
import { FlatList, StyleSheet, View } from "react-native";
import HeadlineFooter from "../components/HeadlineFooter";
import SpinningLoader from "../components/SpinningLoader";
import { IHeadline } from "../interface/headline.interface";

const HomeScreen = () => {
  const {
    page,
    loading,
    headlines,
    onLoadMore,
    getNewsFunc,
    unPinHandler,
    onPinHandler,
    pinnedHeadlines,
    onDeleteHandler,
  } = useFetchNews();

  useEffect(() => {
    getNewsFunc();
  }, []);

  // list item
  const renderItem = ({ item, index }: { item: IHeadline; index: number }) => {
    const onPinFunc = () => onPinHandler(item);
    const onDelete = () => onDeleteHandler(index);
    return (
      <HeadlineCard
        {...item}
        onPinHandler={onPinFunc}
        onDeleteHandler={onDelete}
      />
    );
  };

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

  // list header item
  const renderHeader = () => (
    <>
      {pinnedHeadlines?.length > 0 ? (
        <View style={styles.g8}>
          <HeaderText title="Pinned HeadLines" />
          {renderPinnedItems}
        </View>
      ) : null}
      <HeaderText title="HeadLines" isSpacing />
    </>
  );

  // list empty
  const renderEmpty = () => <>{loading ? <SpinningLoader /> : <NoData />}</>;

  // list footer item
  const renderFooter = () => (
    <HeadlineFooter
      page={page}
      onBtnHandler={onLoadMore}
      headlineCount={headlines?.length}
    />
  );

  return (
    <View style={styles.main}>
      <FlatList
        bounces={false}
        renderItem={renderItem}
        data={loading ? [] : headlines}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.pb100}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item?.title} - ${index}`}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 12,
    backgroundColor: themes.white,
  },
  pb100: {
    gap: 10,
    paddingBottom: 100,
  },
  g8: {
    gap: 8,
  },
});
