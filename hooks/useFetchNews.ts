import Toast from "react-native-toast-message";
import { useEffect, useRef, useState } from "react";
import { getHeadlinesRequest } from "../service/headlines";
import { IHeadline } from "../interface/headline.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useFetchNews = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [headlines, setHeadlines] = useState<IHeadline[]>([]);
  const [pinnedHeadlines, setPinnedHeadlines] = useState<IHeadline[]>([]);

  const currentPageRef = useRef<{ page: number }>({ page: 1 });
  const resetTimerRef = useRef<{ reset: boolean }>({ reset: false });
  const recordLastItems = useRef<{ data: IHeadline[] }>({ data: [] });

  const countdownRef = useRef(10); // Initialize countdown with 10 seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (resetTimerRef?.current.reset) {
        resetTimerRef.current.reset = false;
        countdownRef.current = 10;
        return;
      }
      if (countdownRef.current === 0) {
        onRefreshList();
        countdownRef.current = 10; // Reset countdown to 10
        return;
      }
      countdownRef.current--;
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const storeLastItems = (data: IHeadline[]) => {
    recordLastItems.current.data = data?.slice(-5);
  };

  const getNewsFunc = async () => {
    const news = await getNewsFromLocal();
    if (news) {
      const top10 = news?.slice(0, 10);
      setHeadlines(top10);
      storeLastItems(top10);
    } else getNewsFromApi();
  };

  // Function to get 5 random items from initialArray
  const getRandomItems = async () => {
    const list = await getNewsFromLocal();
    const shuffled = list.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const onRefreshList = async () => {
    const lastFiveItems = recordLastItems.current.data;
    const randomHeadlines = await getRandomItems();
    if (randomHeadlines) {
      setHeadlines([...randomHeadlines, ...lastFiveItems]);
    }
  };

  const getNewsFromApi = async () => {
    setLoading(true);
    const newNews: any = await getHeadlinesRequest();
    if (newNews) {
      currentPageRef.current.page = 1;
      const article = newNews?.data?.articles;
      storeNews(article);
      const top10 = article?.slice(0, 10);
      setHeadlines(top10);
      storeLastItems(top10);
      setLoading(false);
    } else setLoading(false);
  };

  const getNewsFromLocal = async () => {
    try {
      const value = await AsyncStorage.getItem("@headlines");
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const storeNews = async (value: unknown) => {
    try {
      await AsyncStorage.setItem("@headlines", JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  const onPinHandler = (headline: IHeadline) => {
    const isExist = pinnedHeadlines?.find(
      (item) => item?.title === headline?.title
    );
    if (isExist) {
      Toast.show({
        type: "error",
        text1: "Headline already pinned",
      });
      return;
    }
    setPinnedHeadlines((prev) => [...prev, headline]);
    Toast.show({
      type: "success",
      text1: "Headline pinned successfully",
    });
  };

  const unPinHandler = (idx: number) => {
    const newPinnedItems = pinnedHeadlines?.filter((_, index) => index !== idx);
    setPinnedHeadlines(newPinnedItems);
  };

  const onDeleteHandler = (idx: number) => {
    const newHeadlines = headlines?.filter((_, index) => index !== idx);
    if (newHeadlines) {
      setHeadlines(newHeadlines);
      storeLastItems(newHeadlines);

      Toast.show({
        type: "success",
        text1: "Headline deleted successfully",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Headline deletion failed",
      });
    }
  };

  const onLoadMore = async () => {
    resetTimerRef.current.reset = true;
    if (currentPageRef.current.page === 10) {
      storeNews([]);
      getNewsFromApi();
    } else {
      const allHeadlines = await getNewsFromLocal();
      if (allHeadlines) {
        const page = currentPageRef.current.page;
        const lastItem = page * 10;
        currentPageRef.current.page = page + 1;
        const newItems = allHeadlines.slice(lastItem, lastItem + 10);
        setHeadlines(newItems);
        storeLastItems(newItems);
      } else getNewsFromApi();
    }
  };

  return {
    page: currentPageRef.current.page,
    loading,
    headlines,
    onLoadMore,
    getNewsFunc,
    onPinHandler,
    unPinHandler,
    pinnedHeadlines,
    onDeleteHandler,
  };
};
