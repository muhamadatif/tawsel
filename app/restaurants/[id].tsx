import ArrowBack from "@/components/ArrowBack";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { COLORS } from "@/Constants/Colors";
import { restaurant } from "@/Constants/Constants";
import DetailsSection from "@/features/restaurant/DetailsSection";
import HeaderSection from "@/features/restaurant/HeaderSection";
import MenuCategoriesSection from "@/features/restaurant/MenuCategoriesSection";
import MenuSection from "@/features/restaurant/MenuSection";
import { useLayout } from "@/features/restaurant/useLayout";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const TalabatLikeScreen = () => {
  const {
    categories,
    logo,
    name,
    description,
    discount,
    deliveryTime,
    rating,
  } = restaurant;

  const {
    activeTab,
    isSticky,
    tabsScrollRef,
    sectionsScrollRef,
    scrollOffset,
    onTabLayout,
    onSectionLayout,
    scrollToSection,
    handleScroll,
  } = useLayout(categories);

  const headerOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, 150], [0, 1]),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.stickyHeader,
          ,
          headerOpacity,
          !isSticky && {
            borderBlockColor: COLORS.grayMedium,
            borderBottomWidth: 1,
          },
        ]}
      />
      <View style={styles.iconContainer}>
        <ArrowBack />
      </View>
      {isSticky && (
        <View style={styles.tabsWrapper}>
          <MenuCategoriesSection
            ref={tabsScrollRef}
            activeCategory={activeTab}
            categories={categories}
            scrollToSection={scrollToSection}
            onTabLayout={onTabLayout}
          />
        </View>
      )}
      <ParallaxScrollView
        headerImage={
          <Image
            source={restaurant.image}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={200}
            priority="high"
            cachePolicy="memory-disk"
            recyclingKey={restaurant.id}
          />
          // <></>
        }
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        ref={sectionsScrollRef}
        onScroll={handleScroll}
        scrollOffset={scrollOffset}
      >
        <View style={{ paddingHorizontal: 16, marginTop: -56 }}>
          <HeaderSection logo={logo} name={name} description={description} />
        </View>

        <View style={styles.content}>
          <DetailsSection
            discount={discount}
            deliveryTime={deliveryTime}
            rating={rating}
          />
          {!isSticky ? (
            <MenuCategoriesSection
              ref={tabsScrollRef}
              activeCategory={activeTab}
              categories={categories}
              scrollToSection={scrollToSection}
              onTabLayout={onTabLayout}
            />
          ) : (
            <View style={{ height: 50 }} />
          )}
          <MenuSection
            categories={categories}
            onSectionLayout={onSectionLayout}
          />
        </View>
      </ParallaxScrollView>
    </View>
  );
};

export default TalabatLikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    position: "relative",
  },
  stickyHeader: {
    position: "absolute",
    top: -10,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "white",
    zIndex: 10,
    padding: 16,
    marginTop: 0,
  },
  iconContainer: {
    paddingLeft: 16,
    backgroundColor: "transparent",
    position: "absolute",
    top: 35,
  },
  imageWrapper: {
    marginTop: -56,
  },
  tabsWrapper: {
    position: "absolute",
    top: 65,
    zIndex: 100,
    backgroundColor: "white",
  },

  content: {
    marginTop: 16,
  },
  categories: {
    flexDirection: "row",
    gap: 8,
    padding: 8,
    paddingLeft: 16,
  },
  category: {
    paddingVertical: 8,
    paddingBottom: 25,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.grayLight,
    gap: 16,
  },
});
