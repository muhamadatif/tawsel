import type { PropsWithChildren, ReactElement } from "react";
import React, { forwardRef } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollOffset: SharedValue<number>;
}>;

const ParallaxScrollView = forwardRef<Animated.ScrollView, Props>(
  (
    { children, headerImage, headerBackgroundColor, onScroll, scrollOffset },
    ref
  ) => {
    const colorScheme = useColorScheme() ?? "light";

    const headerAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              scrollOffset.value,
              [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
              [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
            ),
          },
          {
            scale: interpolate(
              scrollOffset.value,
              [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
              [2, 1, 1]
            ),
          },
        ],
      };
    });

    return (
      <ThemedView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Animated.ScrollView
          ref={ref}
          scrollEventThrottle={16}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
        >
          {Platform.OS === "ios" ? (
            <Animated.View
              style={[
                styles.header,
                { backgroundColor: headerBackgroundColor[colorScheme] },
                headerAnimatedStyle,
              ]}
            >
              {headerImage}
            </Animated.View>
          ) : (
            <View style={styles.header}>{headerImage}</View>
          )}

          <ThemedView style={styles.content}>{children}</ThemedView>
        </Animated.ScrollView>
      </ThemedView>
    );
  }
);

ParallaxScrollView.displayName = "ParallaxScrollView";

export default ParallaxScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
    marginTop: -10,
  },
  content: {
    flex: 1,
  },
});
