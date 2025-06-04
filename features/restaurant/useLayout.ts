import { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";

export function useLayout(array: any[]) {
  const initialPositions = Object.fromEntries(array.map((e) => [e.id, 0]));

  // State
  const [activeTab, setActiveTab] = useState(array[0].id);
  const [isSticky, setIsSticky] = useState<boolean>(false);

  // Refs
  const sectionsScrollRef = useAnimatedRef<Animated.ScrollView>();
  const tabsScrollRef = useAnimatedRef<Animated.ScrollView>();

  const sectionPositions = useRef({
    ...initialPositions,
  });

  const tabPositions = useRef({
    ...initialPositions,
  });

  const isScrollingByPress = useRef(false);

  const scrollOffset = useScrollViewOffset(sectionsScrollRef);

  // onLayout Handlers
  const onSectionLayout = useCallback(
    (categoryId: string) => (e: LayoutChangeEvent) => {
      sectionPositions.current[categoryId] = e.nativeEvent.layout.y;
    },
    []
  );

  const onTabLayout = useCallback(
    (id: string) => (e: LayoutChangeEvent) => {
      tabPositions.current[id] = e.nativeEvent.layout.x;
    },
    []
  );

  // Handlers
  const scrollToSection = useCallback(
    (categoryId: string) => {
      setActiveTab(categoryId);
      isScrollingByPress.current = true;

      sectionsScrollRef.current?.scrollTo({
        y: (sectionPositions.current[categoryId] ?? 0) + 300,
        animated: true,
      });
      setIsSticky(true);

      const tabX = tabPositions.current[categoryId] || 0;
      const screenWidth = Dimensions.get("window").width;
      const scrollToX = tabX - screenWidth / 2 + 50;
      tabsScrollRef.current?.scrollTo({
        x: scrollToX,
        animated: true,
      });
      setTimeout(() => {
        isScrollingByPress.current = false;
      }, 500);
    },
    [sectionsScrollRef, tabsScrollRef]
  );

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isScrollingByPress.current) return;

      const scrollY = e.nativeEvent.contentOffset.y;

      if (scrollY >= 280) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      let current = activeTab;

      for (let i = array.length - 1; i >= 0; i--) {
        const activeTab = array[i]?.id;
        if (scrollY >= sectionPositions.current[activeTab]) {
          current = activeTab;
          break;
        }
      }
      // }

      if (current !== activeTab) {
        setActiveTab(current);

        // Scroll tabs horizontally
        const tabX = tabPositions.current[current] || 0;
        const screenWidth = Dimensions.get("window").width;
        const scrollToX = tabX - screenWidth / 2 + 50;

        tabsScrollRef.current?.scrollTo({
          x: scrollToX,
          animated: true,
        });
      }
    },
    [activeTab, array, tabsScrollRef]
  );

  return {
    isSticky,
    activeTab,
    sectionsScrollRef,
    tabsScrollRef,
    scrollOffset,
    scrollToSection,
    onSectionLayout,
    onTabLayout,
    handleScroll,
  };
}
